#! /usr/bin/python

"""

REST web service for doing automatic
- language identification
- automatic summarization
- keyword extraction
- subgenre classification

By default, starts a webservice at port 24681 (can be set with the -p switch)

Expects posting a document to be annotated to one the following urls
/language
/summary
/keywords
/subgenre

expects the fields of the document to be posted:
    text: Full-text of the document (required),
    summary: Summary of the document (optional),
    language: Language of the document (optional),
    ...

# test with
curl http://localhost:24681/language?text=dit%20is%20een%20test

"""

import argparse
from constants import *
import web
import json
from langid import LanguageAnnotator
from keywords import KeywordsAnnotator
from summary import SummaryAnnotator
from subgenre import SubgenreAnnotator

parser = argparse.ArgumentParser(
    description='''Runs the FACT language, summary and keywords metadata annotator web service''')
parser.add_argument(
    '--debug',
    help="Sets output from the webservice to debug mode",
    action='store_const',
    const=True,
    default=False)
parser.add_argument(
    '-p',
    help="Port to run the webservice on (default: {})".format(DEFAULT_PORT),
    type=int,
    default=DEFAULT_PORT)
parser.add_argument(
    '-solr',
    help="SOLR collection url (default: {})".format(DEFAULT_SOLR_URL),
    default=DEFAULT_SOLR_URL)


class FactApplication(web.application):
    def run(self, port=8080, *middleware):
        func = self.wsgifunc(*middleware)
        return web.httpserver.runsimple(func, ('0.0.0.0', port))


if __name__ == "__main__":
    args = parser.parse_args()
    print "Starting webservice at port {}".format(args.p)

    mapping = {
        'language': LanguageAnnotator(args.solr),
        'keywords': KeywordsAnnotator(args.solr),
        'subgenre': SubgenreAnnotator(args.solr),
        'summary': SummaryAnnotator(),
    }

    class MainHandle:
        def GET(self, name):
            return self.process(name)

        def POST(self, name):
            return self.process(name)

        def process(self, name):
            # allow requests from all domains
            web.header('Access-Control-Allow-Origin', '*')
            web.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')

            if name in mapping:
                return json.dumps(mapping[name].process(web.input()))
            else:
                # unknown process
                return web.internalerror()

    urls = (
        '/(.*)', MainHandle
    )

    web.config.debug = args.debug

    app = FactApplication(urls, globals())
    app.run(port=args.p)


function DocumentModel(){
  this.service_url = "http://localhost:24681"
  // this.service_url = "http://hmifact.ewi.utwente.nl:24681"

  this.text = ko.observable(
    "Roodkapje. Lang geleden is d'r lief klein meisje.\n\nZe gebruik altijd maar rood kapje, daarom naam ja Roodkapje. Eén dag zijn moeder zegt: “Roodkap jouw neneh ziek, kasian, sakit prot, sakit kepala, overal pijn. Djoba jij brengt hem pisang en rambutan en bordje nasi, ik maak sajoer lodeh, lekkere sambal en kwi lappies, zij is gek op, je weet wel, en ongol ongol. Hier doe maar in jouw slendang, maar voorzichtig jij en onderweg niet teveel van snoepen, anders niks meer over voor neneh.” “Nee, zal niet doen”, belooft Roodkapje. “En er was hoor, denk erom, in de bos is boze wolf. Als je hem ziet smeer ‘m gewoon ja?”. “Ik ben niet bang voor boze wolf,” zegt Roodkapje. “Al zo vaak in de bos geweest, nooit gezien. Is d'r niet, boze wolf.” “Altijd eigenwijs, die Roodkapje.” Lief maar eigenwijs, want is d'r wel boze wolf. Hij gluurt door de bomen. Hij ziet Roodkap, hij gaat naar hem toe. “Dag Roodkapje.” Ze schrikt zich rot, maar ze doet alsof zij branie is. “Dag meneer de Wolf.” “Naar waar Roodkapje?” “Naar neneh, meneer de Wolf.” “Waar dan zijn huis?” “Helemaal diep in de bos.” “Hoe diep?” “Zo diep, waar de bos al helemaal donker.” “Sebelah kiri, sebelah kanan?” “Nee, terug alsmaar rechtuit. Waarom wil je weten meneer de Wolf?” “Oh, zomaar. Dag Roodkapje.” “Wil je pisang?” vraagt zij nog. Zo lief toch, die Roodkapje. “Nee lust niet.” En meteen rakus ervandoor. Hij gaat waar de bossen al helemaal donker. Hij komt bij huis van neneh. Hij roept: “Sepada.” “Si apa daar?” vraagt neneh. Hij maakt zijn stem zo particuul als 't jouwe. “Is ik, is Roodkap. Boleh masuk?” “Boleh,” zegt neneh, “ik kom al uit bed. Ik zal open doen de deur” Neneh helemaal niet senang; zij koproet altijd maar naar oma kantjil. Zij doet open de deur. Zij ziet boze wolf. “Allah staga! Min tak, kasian.” Maar boze wolf kan niet verdommen. Vreet hem op in één slok, doet zijn muts aan, gaat in bed liggen, wacht op Roodkapje. Roodkapje zieltje zonder zorg. Zij denkt allang niet meer aan boze wolf. Zij snoept een beetje van ongol ongol, van kue klepon, zij plukt bloemetjes voor neneh. Bloemetje hier, bloemetje daar. Eindelijk bij huis van neneh. Deur staat open. Hoe ken deze? “Neneh, jij thuis?” “Wie dan daar buiten?” “Is Roodkapje. Ik breng pisang en nasi en kroepoek en sate kambing, kwi lappies, kue klepon .” “Whah, lekker deze,” zegt boze wolf. Zo zwaar toch nenehs stem. Zij ken niet begrijpen. “Jij verkouden neneh?” “Ja neneh ziek. Kan niet goed praten. Kom maar gauw bij neneh.” De bed helemaal in donker ook. Daarom Roodkapje, ze herkent boze wolf niet. Zij denkt neneh. “Whah neneh jij zulke grote ogen?” “Om jou beter te kunnen zien.” “Whah en jouw oren ook zo groot neneh.” “Om jou beter te kunnen horen.” “En jou tanden zo groot neneh, zo pertikel joekoede.” “Om jou beter te kunnen opvreten.” Roodkapje zij gilt en wil weglopen. Maar boze wolf heeft hem al te pakken en vreet hem op. Kasian, in één hap. Thuis zijn moeder, zij wordt onrustig. Al bijna donker en Roodkapje nog altijd niet terug van neneh. Maar na boleh deze, hoe kent? Toch niet verdwaald in de bos, toch niet boze wolf tegengekomen? Ze gaat gauw naar de jager. “Jager, Roodkapje al vroeg naar zijn neneh en nu nog niet thuis. Als maar niks gebeurd.” “Wacht maar”, zegt de jager “Natuurlijk weer boze wolf, die smeerlap.” Hij pakt zijn spuit, kaliber 12 zware lopers. Eerst maar naar huis van neneh. “Sepada.” Boze wolf heeft al in de gaten. Hij zegt niks terug. Stommeling deze. Hij is weer in bed gaan liggen met zijn volle buik. “Waar is Roodkapje?” vraagt de jager. “Inda touw”, zegt boze wolf “Hoe wil ik weten? Donder maar op jij, jij hebt niks te maken hier jij. “Zullen wij wel eens zien,” zegt de jager. Hij mikt op zijn kop en – betoel! - doodt die wolf. Hij neemt zijn piso blatti en snijdt open zijn dikke buik. “Adoe, bijna gestikt,” zegt neneh. Zij leeft nog. En Roodkapje, zij danst van plezier. “Nog net op tijd,” zegt de jager. Neneh gauw weer in bed terug. Nog altijd ziek deze. Ze eet nasi en ongol ongol om van te bekomen. De jager, hij krijgt ook voor de beloning. Roodkapje gauw naar huis. Zijn moeder blij, zij zegt: “Zie je wel, is d'r toch boze wolf in de bos”. “Is d'r niet,” zegt Roodkapje: “Want nou toch dood, boze wolf”. En zij leven lang en gelukkig, al."
    );
  this.language = ko.observable();
  this.summary = ko.observable();
  this.subgenre = ko.observable();
  this.keywords = ko.observable("");
  this.entities = ko.observable("");

  // intermediate results from automatic processes
  this.automaticsummary = ko.observable("");
  this.automatickeywords = ko.observable([]);
  this.automaticentities = ko.observable();

  // actions
  this.detectlanguage = function() {
    $.ajax({
      url: this.service_url + "/language",
      type: 'POST',
      dataType: 'JSON',
      data: {
        text: this.text()
      }
    }).done(function(data) {
      if (data.status == 'OK') {
        this.language(data.annotation.language);
      }
    }.bind(this)
    ).fail(function(data) {
      alert('Error detecting language')
    });
  }.bind(this);

  this.updatesummary = function() {
      // steps:

      // 0) get the summary sentences
      sentences = this.automaticsummary().slice();

      // 1) sort by descending score, 
      sentences.sort(function(a,b){return b.score - a.score;});
      // for (var i = 0; i < sentences.length && i < 5; i++) {
      //   console.log(sentences[i].score + ": " + sentences[i].sentence);
      // }

      // 2) select percentage of sentences (round up) based on this.summarylength, 
      var slidervalue = $('#summaryslider').slider('getValue');
      numsentences = Math.ceil(sentences.length * slidervalue / 100);
      sentences = sentences.splice(0, numsentences);

      // 3) sort by idx
      sentences.sort(function(a,b){return a.idx - b.idx;});

      // 4) join sentences to create summary
      s = "";
      for (var i = 0; i < sentences.length; i++) {
        s += sentences[i].sentence + " ";
      }
      this.summary(s.trim());

  }.bind(this);

  this.createsummary = function() {
    $.ajax({
      url: this.service_url + "/summary",
      type: 'POST',
      dataType: 'JSON',
      data: {
        text: this.text()
      }
    }).done(function(data) {
      if (data.status == 'OK') {
        this.automaticsummary(data.annotation.summary);
        this.updatesummary();
      }
    }.bind(this)
    ).fail(function(data) {
      alert('Error creating summary')
    });
  }.bind(this);

  this.detectsubgenre = function() {
    $.ajax({
      url: this.service_url + "/subgenre",
      type: 'POST',
      dataType: 'JSON',
      data: {
        text: this.text()
      }
    }).done(function(data) {
      if (data.status == 'OK') {
        this.subgenre(data.annotation.subgenre);
      }
    }.bind(this)
    ).fail(function(data) {
      alert('Error detecting subgenre')
    });
  }.bind(this);

  this.detectentities = function() {
    $.ajax({
      url: this.service_url + "/ner",
      type: 'POST',
      dataType: 'JSON',
      data: {
        text: this.text()
      }
    }).done(function(data) {
      if (data.status == 'OK') {
        var a = [];
        k = data.annotation.entities;
        for (var i = 0; i < k.length; i++) {
          a.push(
            {entity: k[i], checked: ko.observable(true)}
          );
        }
        this.automaticentities(a);
      } else {
        alert('Could not determine entities: ' + data.message);
      }
    }.bind(this)
    ).fail(function(data) {
      alert('Error detecting entities')
    });
  }.bind(this);

  this.addentityselection = function() {
    var t = this.entities().trim();
    if (t.length > 0) {
      t += "\n"
    }
    this.automaticentities().filter(function(a) {
      if (a.checked()) {
        t += a.entity + "\n";
      }
      return false;
    });
    t = t.trim();
    this.entities(t);
  }.bind(this);

  this.detectkeywords = function() {
    $.ajax({
      url: this.service_url + "/keywords",
      type: 'POST',
      dataType: 'JSON',
      data: {
        text: this.text()
      }
    }).done(function(data) {
      if (data.status == 'OK') {
        var a = [];
        k = data.annotation.keywords;
        for (var i = 0; i < k.length; i++) {
          a.push(
            {keyword: k[i].keyword, score: k[i].score, checked: ko.observable(k[i].score > 10)}
          );
        }
        this.automatickeywords(a);
      }
    }.bind(this)
    ).fail(function(data) {
      alert('Error detecting keywords')
    });
  }.bind(this);

  this.addselection = function() {
    var t = this.keywords().trim();
    if (t.length > 0) {
      t += "\n"
    }
    this.automatickeywords().filter(function(a) {
      if (a.checked()) {
        t += a.keyword + "\n";
      }
      return false;
    });
    t = t.trim();
    this.keywords(t);
  }.bind(this);
};

$(document).ready(function() {
  // create the slider (https://github.com/seiyria/bootstrap-slider)
  $('#summaryslider').slider({
    formatter: function(value) {
      return value + "% van tekst";
    }
  });

  // connect the knockout model to the page
  var model = new DocumentModel();
  ko.applyBindings(model);
});


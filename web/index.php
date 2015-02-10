<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Matter of FACT</title>

  <script src="js/build/fact.js"></script>

  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/bootstrap-slider.min.css" rel="stylesheet">
  <link href="css/custom.css" rel="stylesheet">

  <script>
</script>

</head>

<body>
  <div class="container">
  <h1>Volksverhalenbank invoer</h1>

<form class="form-horizontal">
  <div class="form-group">
    <label for="storytext" class="col-sm-2 control-label">Tekst</label>
    <div class="col-sm-10">
      <textarea class="form-control" id="storytext" placeholder="Vul hier de tekst in" rows="8" data-bind="text: text"></textarea>
    </div>
  </div>
  <div class="form-group">
    <label for="language" class="col-sm-2 control-label">Taal</label>
    <div class="col-sm-10">
      <div class="row">
        <div class="col-sm-6">
        <input type="text" class="form-control" placeholder="Taal" id="language" data-bind="value: language">
        </div>
        <div class="col-sm-6">
            <button class="btn btn-default" type="button" data-bind="click: detectlanguage">Bepaal automatisch</button>
        </div>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label for="summary" class="col-sm-2 control-label">Samenvatting</label>
    <div class="col-sm-10">

      <div class="row">
        <div class="col-sm-6">
          <textarea class="form-control" id="summary" placeholder="Vul hier de samenvatting in" rows="5" data-bind="value: summary"></textarea>
        </div>
        <div class="col-sm-6">
          <div class="input-group">
            <button class="btn btn-default" type="button" data-bind="click: createsummary">Bepaal automatisch</button>
            Lengte: <input id="summaryslider" data-slider-id='dsisummaryslider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="10" data-slider-value="40"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label for="storytext" class="col-sm-2 control-label">Subgenre</label>
    <div class="col-sm-10">
      <div class="row">
        <div class="col-sm-6">
          <select class="form-control" data-bind="value: subgenre">
            <option>Mop</option>
            <option>Sprookje</option>
            <option>Sage</option>
            <option>Broodjeaapverhaal/stadsage</option>
            <option>...</option>
          </select>
        </div>
        <div class="col-sm-6">
            <button class="btn btn-default" type="button" data-bind="click: detectsubgenre">Bepaal automatisch</button>
        </div>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label for="keywords" class="col-sm-2 control-label">Trefwoorden</label>
    <div class="col-sm-10">
      <div class="row">
        <div class="col-sm-6">
          <textarea class="form-control" id="keywords" placeholder="Vul hier trefwoorden in" rows="10" data-bind="value: keywords"></textarea>
        </div>
        <div class="col-sm-6">
          <button class="btn btn-default" type="button" data-bind="click: detectkeywords">Bepaal automatisch</button>
          <button class="btn btn-default" type="button" data-bind="click: addselection">Voeg selectie toe</button>

          <div id="keywordsuggestions" data-bind="foreach: automatickeywords">
            <div><label><input type="checkbox" data-bind="checked: checked"> <span data-bind="text: keyword"></span></label></div>
          </div>
        </div>
      </div>
    </div>
  </div> 

  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Voeg toe</button>
    </div>
  </div>
</form>

  </div>
</div>
</body>
</html>


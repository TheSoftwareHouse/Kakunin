{% extends 'layout/default.njs' %}

{% block content %}

<body onload="inject()">

<div>
  <div id="externaldivid">
    external div
  </div>

  <div>
      <iframe src="about:blank" id="iframeid"> </iframe>
  </div>
</div>

<script type="text/javascript">
function inject() {
    var content = '<div id="internaldivid"> internal div </div>';
    var iframe = document.getElementById("iframeid");
    var iframeDoc = iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.writeln(content);
    iframeDoc.close();
}
</script>

{% endblock %}

{% block content %}
<button id="button">Click me.</button>

<script>
document.getElementById("button").onclick = function() {myFunction()};

function myFunction() {
  setTimeout(function(){
    document.getElementById("button").remove();
  }, 2000)
}
</script>

{% endblock %}

{% block content %}

  <style>

    .colored {
      display: block;
      background-color: #00b8d4;
      outline: none;
    }
  </style>

  <p>Date/Time: <span class="current_date colored"id="datetime"></span></p>



{% endblock %}
{% block javascript %}
  <script>
    window.onload = function () {
      let dt = new Date().toISOString().slice(0, 10);
      document.getElementById('datetime').innerHTML = dt.toLocaleString();
    };
  </script>
{% endblock javascript %}

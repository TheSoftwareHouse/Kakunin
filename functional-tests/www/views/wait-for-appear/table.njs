{% block content %}

  <style>
    .hidden {
      display: none;
    }

    .colored {
      display: block;
      background-color: #00b8d4;
      outline: none;
    }
  </style>

  <button id="hiddenContent" class="hidden" onclick="myFunction()">Render Table</button>

  <hr>
  <table id="hiddenTable" class="hidden">
    <tr>
      <td class="index">1</td>
      <td class="descending-sort">4</td>
      <td class="id">MY_CUSTOM_ID_1</td>
      <td class="name">Some custom name 1</td>
      <td class="options">
        <button class="view">View</button>
      </td>
    </tr>
    <tr>
      <td class="index">2</td>
      <td class="descending-sort">3</td>
      <td class="id">MY_CUSTOM_ID_2</td>
      <td class="name">Some custom name 2</td>
      <td class="options">
        <button class="view">View</button>
      </td>
    </tr>
    <tr>
      <td class="index">3</td>
      <td class="descending-sort">2</td>
      <td class="id">MY_CUSTOM_ID_3</td>
      <td class="name">Some custom name 3</td>
      <td class="options">
        <button class="view">View</button>
      </td>
    </tr>
    <tr>
      <td class="index">4</td>
      <td class="descending-sort">1</td>
      <td class="id">MY_CUSTOM_ID_4</td>
      <td class="name">Some custom name 4</td>
      <td class="options">
        <button class="view">View</button>
      </td>
    </tr>
  </table>


{% endblock %}
{%  block javascript %}
  <script>

    window.onload = function(){
      setTimeout(function() {
        document.getElementById('hiddenContent').className = 'colored';

      }, 4000)
    }

    function myFunction() {
      setTimeout(function() {
        document.getElementById('hiddenTable').removeAttribute("class")

      }, 4000);
    }
  </script>
{% endblock javascript %}

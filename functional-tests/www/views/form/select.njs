{% extends 'layout/default.njs' %}

{% block content %}
  <form method="post" action="/form/select/post">
    <select name="list" id="personlist">
        <option value="1">Person1</option>
        <option value="2">Person2</option>
        <option value="3">Person3</option>
        <option value="4">Person4</option>
     </select>
    <input type="submit" value="Send"/>
  </form>
{% endblock %}

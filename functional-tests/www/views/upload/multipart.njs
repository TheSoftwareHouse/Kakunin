{% extends 'layout/default.njs' %}

{% block content %}
  <form action="/upload" encrypt="multipart/form-data" method="POST">
    <input type="text" name="name" />
    <input type="file" name="myFile" id="myFile" required />
    <input type="submit" value="Upload" T/>
  </form>
{% endblock %}

{% extends 'layout/default.njs' %}

{% block content %}
  <form method="post" action="/form/simple/post">
    <label for="name">
      Name
      <input type="text" name="name" id="name" value="{{ form.name | default('') }}"/>
    </label>

    <label for="description">
      Description
      <textarea name="description" id="description">{{ form.description | default('') }}</textarea>
    </label>

    <label for="checkbox-option-1">
      Checkbox Option 1
      <input type="checkbox" name="checkboxes" id="checkbox-option-1" value="first-checkbox-option" {{ 'checked' if form.checkboxes and form.checkboxes.indexOf('first-checkbox-option') >= 0 }}/>
    </label>

    <label for="checkbox-option-2">
      Checkbox Option 2
      <input type="checkbox" name="checkboxes" id="checkbox-option-2" value="second-checkbox-option" {{ 'checked' if form.checkboxes and form.checkboxes.indexOf('second-checkbox-option') >= 0 }}/>
    </label>

    <label for="checkbox-option-3">
      Checkbox Option 3
      <input type="checkbox" name="checkboxes" id="checkbox-option-3" value="third-checkbox-option" {{ 'checked' if form.checkboxes and form.checkboxes.indexOf('third-checkbox-option') >= 0 }}/>
    </label>

    <label for="radio-option-1">
      Radio Option 1
      <input type="radio" name="radios" id="radio-option-1" value="first-radio-option" {{ 'checked' if form.radios === 'first-radio-option' }}/>
    </label>

    <label for="radio-option-2">
      Radio Option 2
      <input type="radio" name="radios" id="radio-option-2" value="second-radio-option" {{ 'checked' if form.radios === 'second-radio-option' }}/>
    </label>

    <label for="radio-option-3">
      Radio Option 3
      <input type="radio" name="radios" id="radio-option-3" value="third-radio-option" {{ 'checked' if form.radios === 'third-radio-option' }}/>
    </label>

    <label for="status">
      Status
      <select name="status">
        <option value>Select option</option>
        <option value="active" {{ 'selected' if form.status === 'active'  }}>Active</option>
        <option value="inactive" {{ 'selected' if form.status === 'inactive'  }}>Inactive</option>
        <option value="unknown" {{ 'selected' if form.status === 'unknown'  }}>Unknown</option>
      </select>
    </label>

    <input type="submit" value="Send"/>
  </form>
{% endblock %}

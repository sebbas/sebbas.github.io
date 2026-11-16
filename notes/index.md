---
layout: page
title: Notes
updated: 2024-10-27 20:38:07 -0700
---

{%- assign categories = site.notes | map: "categories" | join: "," | split: "," | uniq | sort %}

{%- for cat in categories %}
<h3>{{ cat }}</h3>
<ul>
  {%- assign category_notes = site.notes | where_exp: "note", "note.categories contains cat" %}
  {%- assign visible_notes = category_notes | where_exp: "note", "note.draft != true" | sort: "title" %}

  {%- for note in visible_notes %}
<li><a href="{{ note.url | relative_url }}">{{ note.title }}</a></li>
  {%- endfor %}
</ul>
{%- endfor %}

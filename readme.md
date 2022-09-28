# nucleus-present
This application was created to make developer-friendly presentations. The presentation is written in markdown and parsed to be presented.

## Application views
The application consists out of three main views 

The Editor View is used to create the presentation and get a rough Preview of the slides. (Url: `http://localhost:3030/edit/<slide-name>`)

The View View renderes the finished presentation and connects to the server via a Socket to receive presentation updates (new slide, ...). (Url: `http://localhost:3030/present/<slide-name>`)

Last but not least the Presenter View ist used by the presenter to update slides and see the notes made in the presentation. (Url: `http://localhost:3030/present/<slide-name>/present`)

## Custom Markdown Tags

### YAML Header
At the start of the File you can create a yaml header. The following properties will be rendered in the presentation:
- author
- title
- date

``` yaml
---
author: "mamphis"
title: "Presentation"
date: "28.09.2022"
---
```

### New Slide
To start a new slide in your presentation you must use `@@@`.

Optional classes for the slide can be added after the @-symbols:

`@@@ bg-dark`

This can be used to apply a specific style only for one slide.

### Presenter Notes
Presenter notes can be added anywhere in a slide with ' at the start of a line followed by the comment:

`' this is a comment'`

## Getting started

### Prerequisites

- Typescript installed globally
- Nodejs installed globally

``` bash
$ git clone "https://github.com/mamphis/nucleus-present.md"

$ cd nucleus-present

$ npm i

$ npm run build && node .
```

Then navigate in your browser to `http://localhost:3030/edit/Slide` to edit your first slide named "Slide".



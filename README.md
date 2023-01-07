# Spreadsheet Demo

This is a simple spreadsheet app written in React and Redux Toolkit, built for my front-end portfolio.

It's meant to showcase the UI rather than spreadsheet features (which I was frankly too lazy to implement so far). It's meant for desktop browsers, not mobile.

It can be seen [here](https://frkcrc.github.io/spreadsheet). 

## UI Features

- **Virtualized view**: The spreadsheet view is virtualized (only visible cells are rendered) inside a view pane.
- **Dynamic scrollbars**: The scrollbars adapt to the viewport and size of the spreadsheet, resizing and repositioning as needed. Also the scrollwheel scrolls a row at a time.
- **Cell selection and multiselection**: You can select cells by clicking and dragging.
- **Cell editing**: Double click (or *Enter*) get the currently selected cell in edit mode, *Enter* or clicking away save the edited content (Escape also exits edit mode but without saving). *Delete* will delete everything in the multiselection.
- **Context menu**: Right clicking opens different context menus on cells, headers, and sheet buttons. The menu positions itself to avoid going out of the view area.
- **Row/column manipulation**: You can add/remove rows and columns from the context menus.
- **Row/column resizing**: You can resize rows and columns by dragging a handler in their headers.
- **Arrow keys movement**: Arrow keys move the selection around.

## Unimplemented Features

I mostly implemented UI features, and neglected application features.

- Formulas and references (not implemented yet as I'm working on a spreadsheet engine in Typescript separately).
- Save and load from disk.
- Copy and paste of one/multiple cells at a time.
- Sheet renaming.
- Cell formatting.

The entire project will probably be rewritten from scratch with the missing features as a demo for the spreadsheet engine when I have the time to work on it.
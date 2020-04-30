# dotemmet
render `.emmet` to `.html`

## Demo
![](https://cdn.discordapp.com/attachments/530043751901429762/705017959168344104/deepin-screen-recorder_Select_area_20200429004125.gif)

input
```
html
  head
    title{.emmet test}

  body
    .container
      h1.title{Hello, world!}
      lo
        li{is better}*3

    .demo
      h${This is h$ tag}*6

    lorem

    table.tb[style='border: 1px solid black;']
      tbody
        tr
          td{a}
          td{b}
          td{c}

        tr
          td{$}*3
```

output
```html
<html>
<head>
	<title>.emmet test</title>
</head>
<body>
	<div class="container">
		<h1 class="title">Hello, world!</h1>
		<lo>
			<li>is better</li>
			<li>is better</li>
			<li>is better</li>
		</lo>
	</div>
	<div class="demo">
		<h1>This is h1 tag</h1>
		<h2>This is h2 tag</h2>
		<h3>This is h3 tag</h3>
		<h4>This is h4 tag</h4>
		<h5>This is h5 tag</h5>
		<h6>This is h6 tag</h6>
	</div>
	Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, totam expedita? Ex inventore incidunt a accusamus eligendi rem iusto minus optio? Nam ad eveniet blanditiis beatae id similique laudantium iusto.
	<table class="tb" style="border: 1px solid black;">
		<tbody>
			<tr>
				<td>a</td>
				<td>b</td>
				<td>c</td>
			</tr>
			<tr>
				<td>1</td>
				<td>2</td>
				<td>3</td>
			</tr>
		</tbody>
	</table>
</body>
</html>
```

## installation
use npm
```
npm -g install dotemmet
```

or use yarn (**highly recommend**)
```
yarn global add dotemmet
```

## usage
```
Usage: dotemmet SOURCE [options...]
  or: dotemmet SOURCE DEST [options...]

Render .emmet file(SOURCE) to .html file(DEST)

==options==
-h --help: print this help message
-w --watch: watching SOURCE file and render at saving

==examples==
dotemmet : render index.emmet file to index.html
dotemmet source.emmet : render source.emmet file to source.emmet.html
dotemmet source.emmet rendered.html : render source.emmet file to rendered.html
```

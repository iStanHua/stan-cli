
## Installation
```
npm install -g stan-cli
```
## Getting Started

### beautify

Beautifier for javascript

```
stan -b <dir>
stan --beautify <dir>
```

Example:
```
stan -b build
```

### uglify

A JavaScript parser, mangler/compressor and beautifier toolkit for ES6+

```
stan -u <dir>
stan --uglify <dir>
```

Example:
```
stan -u build
```

### imagemin

Minify images seamlessly

```
stan -i <dir> [type]
stan --imagemin <dir> [type]
```

Example:
```
stan -i build
```

### sass

Compile Sass to CSS

```
stan -s <dir> [outExt]
stan --sass <dir> [outExt]
```

Example:
```
stan -s build
```

### potrace

PNG, JPEG or BMP images to SVG

```
stan -p <dir>
stan --potrace <dir>
```

Example:
```
stan -p build
```
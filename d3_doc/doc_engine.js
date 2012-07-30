// CodeMirror
var delay;
var editor = CodeMirror.fromTextArea(d3.select('.code').node(), {
    mode:'text/html',
    tabMode:'indent',
    onChange:function () {
        clearTimeout(delay);
        delay = setTimeout(updatePreview, 300);
    }
});

function updatePreview() {
    var previewFrame = d3.select('.preview').node();
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(editor.getValue());
    preview.close();
}
setTimeout(updatePreview, 300);

// PageDown markdown conversion
var converter = new Markdown.Converter();
var markdownText = d3.select('.doc').html();
d3.select('.doc').html(converter.makeHtml(markdownText));

// Gist loading
//var gistId = d3.select('.code').node().dataset.gist;
//d3.json('https://api.github.com/gists/'+gistId+'?access_token=b563c9baaee156e7072d', function (json) {
//    var gistContent = json.files['index.html'].content;
//    editor.setValue(gistContent);
//});

function foo(response) {
    var meta = response.meta
    var data = response.data
    console.log(response)
}

function test(d, i){console.log(d, i);}

    var gistId = d3.select('.code').node().dataset.gist;
d3.text('https://api.github.com/gists/'+gistId+'?callback=dummy', function (jsonP) {
    var json = JSON.parse(jsonP.slice(6, -2));
    var gistContent = json.data.files['index.html'].content;
    editor.setValue(gistContent);

});


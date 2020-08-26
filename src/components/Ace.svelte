<script>
  import { onMount } from 'svelte';
  const ace = require('../../vendors/ajaxorg/ace/ace');
  // ace.config.setModuleUrl('ace/mode/javascript', require('../../vendors/ajaxorg/ace/mode-javascript.js'))
  // ace.config.setModuleUrl('ace/theme/monokai', require('../../vendors/ajaxorg/ace/theme-monokai.js'))
  require('../../vendors/ajaxorg/ace/mode-turtle');
  const ext = require('../../vendors/ajaxorg/ace/ext-language_tools');
  // require('../../vendors/ajaxorg/ace/theme-monokai');

  onMount(async () => {
    const editor = ace.edit("editor");
    // editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/turtle");
    editor.session.setUseWorker(false);
    editor.enableLiveAutocompletion = 1;
    editor.setOptions({enableLiveAutocompletion: [{
      getCompletions: function(editor, session, pos, prefix, callback) {
        console.log('complete me', prefix);
        callback(null, [
          {
              // caption: 'xyz',
              value: prefix + 'more',
              // score: 3,
              // meta: 'hello',
          },
        ]);
      }
    }]});

    editor.session.on('change', function(delta) {
    // delta.start, delta.end, delta.lines, delta.action
      console.log(delta);
      if (delta.action === 'insert' && delta.lines[0] === 'x') {
        editor.undo();
        editor.insert(' .\n');
      }
      // editor.insert("Something cool");
      // editor.selection.getCursor();
      // editor.session.replace(new ace.Range(0, 0, 1, 1), "new text");
      // editor.session.remove(new ace.Range(0, 0, 1, 1));
      // editor.session.insert({row:1,column:2}, "new text");
      // editor.undo();
    });

    // editor.session.selection.on('changeCursor', function(e) {
    //   console.log(e);
    // });
  });
</script>

<style>
    #editor {
        height: 80vh;
    }

  .mdc-layout-grid {
    padding-top: 0px;
  }
</style>

<div class="mdc-layout-grid mdc-typography">
  <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell">
      <div id="editor">function foo</div>
      <div>hello</div>
    </div>
  </div>
</div>

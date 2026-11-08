import { createRSEditor } from '../dist/esm/index.js';

/** Mount once: switching demos keeps the edited document and undo history. */
export function mountExternalDemo(root) {
    if (window.externalEditor) return window.externalEditor;
    root.innerHTML = `
        <h2>v0.7：外部操作・タッチ操作</h2>
        <p>本文を選択して「操作パネル」を開いてみてください。文字色や表のメニューを、外部ボタンから開けます。</p>
        <div class="controls v07-controls">
            <button id="v07-open" aria-expanded="false" aria-controls="v07-panel">操作パネル</button>
            <button id="v07-layout" aria-pressed="false">スマホ用の操作表示に切替</button>
            <button id="v07-narrow" aria-pressed="false">幅390pxで確認</button>
        </div>
        <div id="v07-panel" class="controls v07-controls" hidden>
            <button data-v07-tool="bold" aria-pressed="false">太字</button>
            <button data-v07-tool="forecolor">文字色</button>
            <button data-v07-tool="table">表</button>
            <button data-v07-tool="image">画像</button>
            <button id="v07-picker">画像選択画面を開く</button>
            <button id="v07-undo">元に戻す</button><button id="v07-redo">やり直す</button>
        </div>
        <p id="v07-state" class="status" aria-live="polite"></p>
        <div id="v07-editor-host"><textarea id="v07-editor"><p>ここを選択して、外部の操作パネルから編集してください。</p><p>画像を選ぶ前に、この文中の挿入位置をクリックしてください。</p><p><img src="./article-sample.svg" alt="サイズ変更用のサンプル画像" width="160"></p><p>画像をクリックし、右下のハンドルを指・マウス・ペンで動かすとサイズを変更できます。</p></textarea></div>
        <div class="v07-options">
            <label><input id="v07-floating" type="checkbox" checked> 選択時の小さなツールバーを表示</label>
            <label><input id="v07-readonly" type="checkbox"> 読み取り専用にする</label>
            <label><input id="v07-transform" type="checkbox"> transform付きの親要素で確認</label>
        </div>
        <details class="v07-bookmark" open>
            <summary>選択範囲の保存・復元を試す</summary>
            <p>本文の文字を選択 →「選択範囲を保存」→ 下の入力欄を操作 →「保存した選択を復元」。本文を編集した場合は保存位置が無効になります。</p>
            <div class="controls"><button id="v07-capture">選択範囲を保存</button><button id="v07-restore" disabled>保存した選択を復元</button></div>
            <label class="v07-other-label">エディタ外の入力欄<input id="v07-other" type="text" placeholder="ここを操作してから、選択を復元できます"></label>
        </details>
        <p id="v07-message" role="status">本文と履歴は、操作表示を切り替えても維持されます。</p>
        <p class="status">スマホでは文字色メニューや画像ダイアログを開き、キーボードを表示した状態でも確定ボタンを操作できます。</p>`;
    const $ = (selector) => root.querySelector(selector);
    const editor = createRSEditor($('#v07-editor'), {
        toolbar: 'undo redo | bold italic | forecolor | image table',
        floatingToolbar: 'bold italic | link',
        imageUploadHandler: (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            }),
    });
    window.externalEditor = editor;
    let bookmark = null,
        saved = null,
        compact = false;
    const capture = () => {
        bookmark = editor.captureSelection() || bookmark;
    };
    const message = (text) => {
        $('#v07-message').textContent = text;
    };
    const restore = (token) => {
        if (editor.restoreSelection(token)) return true;
        message('本文で選択範囲・挿入位置を選び直してください。');
        return false;
    };
    const refresh = () => {
        capture();
        for (const b of root.querySelectorAll('[data-v07-tool]')) {
            const state = editor.getToolState(b.dataset.v07Tool);
            b.disabled = !state.enabled;
            if (b.dataset.v07Tool === 'bold') b.setAttribute('aria-pressed', String(state.active));
        }
        const bold = editor.getToolState('bold');
        $('#v07-state').textContent =
            `太字：${bold.active ? 'ON' : 'OFF'} ／ 外部操作：${bold.enabled ? '使用可能' : '使用不可（読み取り専用）'} ／ 操作表示：${compact ? 'スマホ用' : 'PC用'}`;
        $('#v07-picker').disabled = !editor.isEnabled('image');
        $('#v07-undo').disabled = !editor.isEnabled('undo');
        $('#v07-redo').disabled = !editor.isEnabled('redo');
    };
    root.addEventListener('pointerdown', (e) => {
        if (editor.wrapper.contains(e.target)) return;
        if (e.target.closest('button,input,select')) capture();
        // Buttons act on the editor selection; keep native focus in the editor.
        // Inputs still receive focus normally for the explicit restoration example.
        if (e.target.closest('button')) e.preventDefault();
    });
    // Touch actions use pointer release, with movement/cancellation guards. Keep
    // native click for keyboard/mouse, and suppress only the duplicate touch click.
    let touchAction = null,
        activatedTouch = null;
    root.addEventListener('pointerdown', (e) => {
        activatedTouch = null;
        const button = e.target.closest('button');
        touchAction =
            e.pointerType === 'touch' &&
            e.isPrimary &&
            button &&
            !button.disabled &&
            !editor.wrapper.contains(button)
                ? { button, id: e.pointerId, x: e.clientX, y: e.clientY }
                : null;
    });
    root.addEventListener('pointermove', (e) => {
        if (
            touchAction?.id === e.pointerId &&
            Math.hypot(e.clientX - touchAction.x, e.clientY - touchAction.y) > 10
        )
            touchAction = null;
    });
    root.addEventListener('pointercancel', () => {
        touchAction = null;
    });
    root.addEventListener('pointerup', (e) => {
        const action = touchAction;
        touchAction = null;
        if (
            !action ||
            action.id !== e.pointerId ||
            action.button.disabled ||
            Math.hypot(e.clientX - action.x, e.clientY - action.y) > 10
        )
            return;
        e.preventDefault();
        activatedTouch = { button: action.button, time: e.timeStamp };
        action.button.click();
    });
    root.addEventListener('keydown', () => {
        activatedTouch = null;
    });
    root.addEventListener(
        'click',
        (e) => {
            if (e.isTrusted && activatedTouch && e.timeStamp - activatedTouch.time < 700) {
                e.preventDefault();
                e.stopImmediatePropagation();
                activatedTouch = null;
            }
        },
        true,
    );
    editor.contentEl.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') capture();
    });
    editor.on('selectionchange', refresh);
    editor.on('change', refresh);
    editor.on('readonlychange', refresh);
    $('#v07-open').onclick = () => {
        const panel = $('#v07-panel');
        panel.hidden = !panel.hidden;
        $('#v07-open').setAttribute('aria-expanded', String(!panel.hidden));
    };
    for (const b of root.querySelectorAll('[data-v07-tool]'))
        b.onclick = () => {
            if (!restore(bookmark)) return;
            editor.openTool(b.dataset.v07Tool, { anchor: b });
            refresh();
        };
    $('#v07-layout').onclick = () => {
        compact = !compact;
        editor.setToolbar(compact ? false : 'undo redo | bold italic | forecolor | image table');
        editor.setFloatingToolbar(compact ? false : 'bold italic | link');
        $('#v07-floating').checked = !compact;
        $('#v07-layout').textContent = compact ? 'PC用の操作表示に切替' : 'スマホ用の操作表示に切替';
        $('#v07-layout').setAttribute('aria-pressed', String(compact));
        if (compact) {
            $('#v07-panel').hidden = false;
            $('#v07-open').setAttribute('aria-expanded', 'true');
        }
        if (bookmark) restore(bookmark);
        refresh();
        message('操作表示を切り替えました。本文・選択位置・元に戻す履歴を維持しています。');
    };
    $('#v07-narrow').onclick = () => {
        const narrow = root.classList.toggle('v07-narrow');
        $('#v07-narrow').setAttribute('aria-pressed', String(narrow));
        $('#v07-narrow').textContent = narrow ? '通常の幅に戻す' : '幅390pxで確認';
        window.dispatchEvent(new Event('resize'));
    };
    $('#v07-floating').onchange = (e) =>
        editor.setFloatingToolbar(e.target.checked ? 'bold italic | link' : false);
    $('#v07-readonly').onchange = (e) => editor.setReadonly(e.target.checked);
    $('#v07-transform').onchange = (e) => {
        $('#v07-editor-host').style.transform = e.target.checked ? 'translateZ(0)' : '';
        window.dispatchEvent(new Event('resize'));
    };
    $('#v07-undo').onclick = () => editor.undo();
    $('#v07-redo').onclick = () => editor.redo();
    $('#v07-capture').onclick = () => {
        saved = bookmark;
        $('#v07-restore').disabled = !saved;
        message(
            saved
                ? '選択範囲を保存しました。外の入力欄を操作してから復元できます。'
                : '先に本文の文字や挿入位置を選んでください。',
        );
    };
    $('#v07-restore').onclick = () => {
        if (restore(saved)) message('保存した選択範囲を復元しました。');
    };
    $('#v07-picker').onclick = async () => {
        const at = bookmark;
        if (!restore(at)) return;
        const preview = document.createElement('div');
        preview.innerHTML =
            '<img src="./article-sample.svg" alt="記事のサンプル画像" width="120"><p>「この画像を挿入」で、開く前の挿入位置へ戻って画像を追加します。</p>';
        const result = await editor.openDialog({
            title: '画像を選択',
            body: preview,
            submitLabel: 'この画像を挿入',
        });
        if (!result) {
            restore(at);
            return;
        }
        if (restore(at)) {
            editor.commands.insertImage({ src: './article-sample.svg', alt: '選択画面から挿入した画像' });
            message('選択画面を開く前の位置に画像を挿入しました。');
        }
    };
    refresh();
    return editor;
}

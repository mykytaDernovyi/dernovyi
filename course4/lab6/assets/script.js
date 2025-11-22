const tab = document.getElementsByClassName('tab');
const tabContent = document.getElementsByClassName('tabContent');

function hideTabsContent(a) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

document.getElementById('tabs').onclick = function (event) {
    const target = event.target;
    if (target.className.includes('tab')) {
        for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

hideTabsContent(1);

function generateRadius() {
    const rtl = document.getElementById('rtl').value;
    const rtr = document.getElementById('rtr').value;
    const rbr = document.getElementById('rbr').value;
    const rbl = document.getElementById('rbl').value;

    document.getElementById('val-tl').innerText = rtl;
    document.getElementById('val-tr').innerText = rtr;
    document.getElementById('val-br').innerText = rbr;
    document.getElementById('val-bl').innerText = rbl;

    const block = document.getElementById('block-radius');
    const textarea = document.getElementById('code-radius');

    const radiusValue = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`;

    block.style.borderRadius = radiusValue;

    textarea.value = `border-radius: ${radiusValue};`;
}

document.getElementById('rtl').oninput = generateRadius;
document.getElementById('rtr').oninput = generateRadius;
document.getElementById('rbr').oninput = generateRadius;
document.getElementById('rbl').oninput = generateRadius;

generateRadius();

function generateFloat() {
    const radios = document.getElementsByName('floatVal');
    let selectedValue = 'none';

    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }

    const block = document.getElementById('block-float');
    const textarea = document.getElementById('code-float');

    block.style.float = selectedValue;

    textarea.value = `float: ${selectedValue};`;
}

const floatRadios = document.getElementsByName('floatVal');
for (const radio of floatRadios) {
    radio.onchange = generateFloat;
}
generateFloat();


function generateFont() {
    const select = document.getElementById('fontSelect');
    const selectedFont = select.value;

    const textBlock = document.getElementById('text-preview');
    const textarea = document.getElementById('code-font');

    textBlock.style.fontFamily = selectedFont;

    textarea.value = `font-family: ${selectedFont};`;
}

document.getElementById('fontSelect').onchange = generateFont;
generateFont();
const t = document.querySelector('.info-item-template');
const container = document.querySelector('.content');

data.events.forEach(item => {
    const content = t.cloneNode(true).content;

    content.querySelector('.info-item').classList.add(`info-item__${item.size}`);
    content.querySelector('.info-item__title').textContent = item.title;

    content
        .querySelector('.info-item-icon-use')
        .setAttributeNS('http://www.w3.org/1999/xlink', 'href', `./img/sprite.svg#${item.icon}`);
    content.querySelector('.info-item-metadata__desc').textContent = item.source;
    content.querySelector('.info-item-metadata__date').textContent = item.time;

    if (item.type === 'critical') {
        content.querySelector('.info-item-main-part').classList.add('critical');
        content.querySelector('.info-item-icon').classList.add('critical');
        content.querySelector('.info-item-icon__cross').classList.add('white');
    }

    if (item.data || item.description) {
        content.querySelector('.info-item-add-info').classList.add('active');

        if (item.type === 'critical') {
            content.querySelector('.info-item-interline-container').classList.add('active');
        }
    }

    if (item.description) {
        content.querySelector('.info-item__description').classList.add('active');
        content.querySelector('.info-item__description').textContent = item.description;
    }

    if (item.data && item.data.temperature && item.data.humidity) {
        content.querySelector('.info-item-temperature').classList.add('active');
        content.querySelector('.info-item-temperature-temp').textContent =
            item.data.temperature + ' C';
        content.querySelector('.info-item-temperature-wet').textContent = item.data.humidity + '%';
    }

    if (item.data && item.data.type === 'graph') {
        // TODO: отрисовывать график
        content.querySelector('.info-item__img-container').classList.add('active');
        content.querySelector('.info-item__img').src = './img/Richdata.svg';
    }

    if (item.data && item.data.image && item.icon === 'cam') {
        content.querySelector('.info-item__img-container').classList.add('active');
        content.querySelector('.info-item__img').src = './img/img.png';
        content.querySelector('.info-item__img').srcset =
            './img/img@3x.png 336w, ./img/img@2x.png 224w, ./img/img.png 112w';
        content.querySelector('.info-item-camera-control').classList.add('active');
    }

    if (item.data && item.data.buttons) {
        content.querySelector('.info-item-button-container').classList.add('active');
        item.data.buttons.forEach(el => {
            const newA = document.createElement('A');
            newA.setAttribute('class', 'info-item-button');
            newA.setAttribute('href', '#');
            newA.textContent = el;
            content.querySelector('.info-item-button-container').appendChild(newA);
        });
    }

    if (item.data && item.data.track) {
        content.querySelector('.info-item-music').classList.add('active');
        content.querySelector('.info-item-music__logo').src = item.data.albumcover;
        content.querySelector('.info-item-music__title').textContent =
            item.data.artist + ' - ' + item.data.track.name;
        content.querySelector('.info-item-music__time').textContent = item.data.track.length;
        content.querySelector('.info-item-music__volume').textContent = item.data.volume + '%';
    }

    container.appendChild(document.importNode(content, true));
});

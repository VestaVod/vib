const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

const programBlock = document.querySelector('#program');
const showProgramButton = document.querySelector('#show-program');
const serviceForm = document.querySelector('#service-form');
const guideCheckbox = document.querySelector('#guide');
const audioCheckbox = document.querySelector('#audio');
const catalogCheckbox = document.querySelector('#catalog');
const choiceError = document.querySelector('#choice-error');
const dataError = document.querySelector('#data-error');
const resultBlock = document.querySelector('#result');
const reportJsonBlock = document.querySelector('#report-json');

const checkedById = {
  guide: guideCheckbox,
  audio: audioCheckbox,
  catalog: catalogCheckbox,
};

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const chosen = services.filter((service) => {
    if (service.id === 'guide') {
      return guideChecked;
    }
    if (service.id === 'audio') {
      return audioChecked;
    }
    if (service.id === 'catalog') {
      return catalogChecked;
    }
    return false;
  });

  const items = chosen.map(({ title, price }) => ({ title: title.trim(), price }));

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return { count: items.length, total, items };
}

let data = null;
try {
  data = JSON.parse(sourceJson);
} catch (error) {
  dataError.hidden = false;
  serviceForm.hidden = true;
}

if (data !== null) {
  showProgramButton.addEventListener('click', () => {
    programBlock.hidden = false;
    programBlock.innerHTML = data.event.meeting;
  });

  serviceForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const report = buildReport(
      data.services,
      guideCheckbox.checked,
      audioCheckbox.checked,
      catalogCheckbox.checked
    );

    if (report.count === 0) {
      choiceError.hidden = false;
      resultBlock.hidden = true;
      reportJsonBlock.hidden = true;
      return;
    }

    choiceError.hidden = true;

    const lines = [`Выбрано услуг: ${report.count}<br>Итого: ${report.total} руб.`];
    for (const item of report.items) {
      lines.push(item.title);
    }
    resultBlock.innerHTML = lines.join('<br>');

    const reportJson = JSON.stringify(report);
    JSON.parse(reportJson);
    reportJsonBlock.textContent = reportJson;

    resultBlock.hidden = false;
    reportJsonBlock.hidden = false;
  });
}

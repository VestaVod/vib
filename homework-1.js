// ДЗ 1. Консольное меню
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 1. Билетная касса

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  let count = 0;
  let money = budget;
  while (money >= price) {
    money = money - price;
    count = count + 1;
  }
  return count;
}

// 2. Доставка заказа

function deliveryPrice(distance, total) {
  if (total >= 3000) {
    return 0;
  }
  if (distance <= 3) {
    return 0;
  }
  if (distance <= 10) {
    return 200;
  }
  return 200 + 25 * (distance - 10);
}

// 3. Лестница

function printSteps(height) {
  let built = 0;
  for (let step = 1; step <= height; step = step + 1) {
    if (step == 4) {
      continue;
    }
    console.log('Ступень ' + step);
    built = built + 1;
    if (step == 10) {
      console.log('Дальше лестница не построена');
      break;
    }
  }
  console.log('Всего построено: ' + built);
}

// Меню

console.log('Выберите задачу:');
console.log('1 — билетная касса');
console.log('2 — доставка заказа');
console.log('3 — лестница');
rl.question('Ваш выбор: ', function (choice) {
  if (choice === '1') {
    rl.question('Категория билета: ', function (category) {
      rl.question('Бюджет: ', function (budget) {
        category = Number(category);
        budget = Number(budget);
        let price = ticketPrice(category);
        if (price === 0) {
          console.log('неизвестная категория');
          rl.close();
        } else {
          let count = maxTickets(budget, price);
          console.log('Категория ' + category + ', билет ' + price + ' руб., бюджет ' + budget + ' руб.: можно купить ' + count + ' шт.');
          rl.close();
        }
      });
    });
  } else if (choice === '2') {
    rl.question('Расстояние: ', function (distance) {
      rl.question('Сумма заказа: ', function (total) {
        distance = Number(distance);
        total = Number(total);
        let delivery = deliveryPrice(distance, total);
        console.log('Расстояние ' + distance + ' км, заказ ' + total + ' руб.: доставка ' + delivery + ' руб.');
        rl.close();
      });
    });
  } else if (choice === '3') {
    rl.question('Высота лестницы: ', function (height) {
      printSteps(Number(height));
      rl.close();
    });
  } else {
    console.log('такой задачи нет');
    rl.close();
  }
});

export interface EstimateItem {
  name: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
}

export interface EstimateSection {
  title: string;
  items: EstimateItem[];
  subtotal: number;
}

export interface CalculatorParams {
  length: number;
  width: number;
  partitionLength: number;
  floors: '1' | '1.5';
  foundation: 'сваи' | 'ленточный' | '';
  wallMaterial: 'профилированный брус' | 'оцилиндрованное бревно' | 'каркас' | '';
  distance: '0-30' | '30-60' | '60-90';
}

export function calculateEstimate(params: CalculatorParams): { sections: EstimateSection[]; total: number } {
  const { length: l, width: w, partitionLength: pl, floors, foundation, wallMaterial } = params;
  
  const area = l * w;
  const perimeter = 2 * (l + w) + pl;
  const isOneFloor = floors === '1';
  const mansardWallHeight = isOneFloor ? 0 : 1;
  const roofHeight = w / 2.5;
  const mansardHeight = isOneFloor ? 0 : mansardWallHeight + roofHeight;

  const sections: EstimateSection[] = [];

  const pilesCount = Math.ceil(perimeter / 2);
  const isPilesSelected = foundation === 'сваи';
  sections.push({
    title: 'Фундамент из винтовых свай',
    items: [
      { name: 'Свая винтовая 89/6,5/300(2,5м)', unit: 'шт', quantity: pilesCount, price: 3000, total: isPilesSelected ? pilesCount * 3000 : 0 },
      { name: 'Оголовки для свай съемные(150х150)мм', unit: 'шт', quantity: pilesCount, price: 600, total: isPilesSelected ? pilesCount * 600 : 0 },
      { name: 'Монтаж свай', unit: 'шт', quantity: pilesCount, price: 4000, total: isPilesSelected ? pilesCount * 4000 : 0 },
    ],
    subtotal: isPilesSelected ? pilesCount * 7600 : 0
  });

  const concrete = Math.ceil(perimeter * 0.4 * 100) / 100;
  const drainagePillow = Math.ceil(perimeter * 0.15);
  const reinforcement = Math.ceil(perimeter * 15 / 100) * 100;
  const bindingWire = Math.ceil(perimeter * 0.06);
  const formworkBoard = Math.ceil(perimeter * 0.126);
  const nails = Math.ceil(perimeter * 0.25);
  const screws = Math.ceil(perimeter * 20 / 10) * 10;
  const film = Math.ceil(perimeter * 1.6 / 10) * 10;
  const staples = Math.ceil(perimeter * 35 / 1000) * 1000;
  const fixators = Math.ceil(perimeter * 10 / 100) * 100;
  const isStripSelected = foundation === 'ленточный';
  
  const stripItems: EstimateItem[] = [
    { name: 'Бетон B20 M250(на щебне)', unit: 'м3', quantity: concrete, price: 8100, total: isStripSelected ? Math.ceil(concrete * 8100) : 0 },
    { name: 'Дренажная подушка(ПГС)', unit: 'т', quantity: drainagePillow, price: 1000, total: isStripSelected ? drainagePillow * 1000 : 0 },
    { name: 'Арматура металлическая(12мм)', unit: 'п.м', quantity: reinforcement, price: 100, total: isStripSelected ? reinforcement * 100 : 0 },
    { name: 'Проволока вязальная(0,4мм)', unit: 'кг', quantity: bindingWire, price: 500, total: isStripSelected ? bindingWire * 500 : 0 },
    { name: 'Доска для опалубки 1-й сорт(50х200х6000)мм', unit: 'м3', quantity: formworkBoard, price: 19500, total: isStripSelected ? formworkBoard * 19500 : 0 },
    { name: 'Гвозди(4х100)мм', unit: 'кг', quantity: nails, price: 200, total: isStripSelected ? nails * 200 : 0 },
    { name: 'Саморезы черные(4,2х90)мм', unit: 'шт', quantity: screws, price: 3, total: isStripSelected ? screws * 3 : 0 },
    { name: 'Пленка полиэтиленовая(200мк)', unit: 'м2', quantity: film, price: 70, total: isStripSelected ? film * 70 : 0 },
    { name: 'Скобы для степпера(№10)', unit: 'шт', quantity: staples, price: 0.2, total: isStripSelected ? staples * 0.2 : 0 },
    { name: 'Фиксаторы арматуры(35мм)', unit: 'шт', quantity: fixators, price: 10, total: isStripSelected ? fixators * 10 : 0 },
    { name: 'Монтаж фундамента(с буронабивными сваями)', unit: 'м3', quantity: concrete, price: 10000, total: isStripSelected ? Math.ceil(concrete * 10000) : 0 },
  ];
  
  sections.push({
    title: 'Фундамент ленточный, с буронабивными сваями',
    items: stripItems,
    subtotal: isStripSelected ? stripItems.reduce((sum, item) => sum + item.total, 0) : 0
  });

  const bindingBrusVolume = Math.ceil(perimeter / 6) * 0.12;
  const roofingFelt = Math.ceil(perimeter / 10) * 10;
  const antiseptic = Math.ceil(perimeter * 0.166 / 10) * 10;
  const clamps = Math.ceil(perimeter * 0.2);
  
  const bindingItems: EstimateItem[] = [
    { name: 'Обвязочный брус(100х200х6000)мм', unit: 'м3', quantity: bindingBrusVolume, price: 19500, total: Math.ceil(bindingBrusVolume * 19500) },
    { name: 'Рубероид РПП 300', unit: 'м2', quantity: roofingFelt, price: 65, total: roofingFelt * 65 },
    { name: 'Антисептик', unit: 'л', quantity: antiseptic, price: 130, total: antiseptic * 130 },
    { name: 'Скобы строительные(8х250)', unit: 'шт', quantity: clamps, price: 60, total: clamps * 60 },
    { name: 'Монтаж обвязки', unit: 'м3', quantity: bindingBrusVolume, price: 10000, total: Math.ceil(bindingBrusVolume * 10000) },
  ];
  
  sections.push({
    title: 'Обвязка фундамента',
    items: bindingItems,
    subtotal: bindingItems.reduce((sum, item) => sum + item.total, 0)
  });

  const totalWallHeight = (2.2 + 0.6) + mansardWallHeight;
  const brusVolume = perimeter * totalWallHeight * 0.15;
  const jute = Math.ceil((brusVolume / 0.135 * 6.5) / 100) * 100;
  const shkanty = Math.ceil((jute / 8) / 10) * 10;
  const skobki = Math.ceil((jute * 5) / 1000) * 1000;
  const skobyStroit = Math.ceil(brusVolume * 5);
  
  const isBrusSelected = wallMaterial === 'профилированный брус';
  const brusPrice = 19500;
  
  const brusItems: EstimateItem[] = [
    { name: 'Профилированный брус естественной влажности(150х150х6000)мм', unit: 'м3', quantity: parseFloat(brusVolume.toFixed(2)), price: brusPrice, total: isBrusSelected ? Math.ceil(brusVolume * brusPrice) : 0 },
    { name: 'Джут(150мм)', unit: 'п.м', quantity: jute, price: 25, total: isBrusSelected ? jute * 25 : 0 },
    { name: 'Шканты березовые(25х250)мм', unit: 'шт', quantity: shkanty, price: 10, total: isBrusSelected ? shkanty * 10 : 0 },
    { name: 'Скобы для степпера(№10)', unit: 'шт', quantity: skobki, price: 0.2, total: isBrusSelected ? skobki * 0.2 : 0 },
    { name: 'Скобы строительные(8х250)мм', unit: 'шт', quantity: skobyStroit, price: 60, total: isBrusSelected ? skobyStroit * 60 : 0 },
    { name: 'Монтаж сруба', unit: 'м3', quantity: parseFloat(brusVolume.toFixed(2)), price: 17000, total: isBrusSelected ? Math.ceil(brusVolume * 17000) : 0 },
  ];
  
  sections.push({
    title: 'Сруб из профилированного бруса',
    items: brusItems,
    subtotal: isBrusSelected ? brusItems.reduce((sum, item) => sum + item.total, 0) : 0
  });

  const total = sections.reduce((sum, section) => sum + section.subtotal, 0);
  
  return { sections, total };
}

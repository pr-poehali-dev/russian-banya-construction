interface EstimateLiveProps {
  material: string;
  length: string;
  width: string;
  foundation: string;
  location: string;
}

const EstimateLive = ({ material, length, width, foundation, location }: EstimateLiveProps) => {
  if (!length || !width || !material) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium mb-2">Заполните параметры калькулятора</p>
        <p className="text-sm">Выберите материал стен, длину и ширину для расчёта сметы</p>
      </div>
    );
  }

  const area = parseFloat(length) * parseFloat(width);
  const perimeter = (parseFloat(length) + parseFloat(width)) * 2;
  const height = 2.2;
  const wallVolume = perimeter * height * 0.15;

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calculateFoundationTotal = () => {
    if (!foundation || foundation === 'net') return 0;
    
    if (foundation === 'lentochnyj') {
      return 232510 + 9640 + 550 + 450 + 77 + 210 + 2000 + 44000;
    }
    if (foundation === 'stolbchatyj') {
      return 72000 + 8640 + 550 + 450 + 77 + 210 + 2000 + 33000;
    }
    if (foundation === 'plitnyj') {
      return area * 0.25 * 4500 + area * 15 * 55 + area * 800 + 8640 + 550 + 450 + 77 + 210 + 2000 + (area * 800);
    }
    return 0;
  };

  const calculateWallsTotal = () => {
    const pricePerM3 = material === 'bревно' ? 27000 : 22000;
    const wallPrice = wallVolume * pricePerM3;
    const assemblyPrice = area * 7000;
    return wallPrice + assemblyPrice + 8640 + 320 + 450 + 180 + 2000 + 3500 + 300 + 960 + 700 + 3200 + 550 + 180 + 960;
  };

  const calculateDeliveryTotal = () => {
    if (!location) return 0;
    if (location === 'perm') return 0;
    if (location === 'perm-30km') return 5000;
    if (location === 'perm-50km') return 10000;
    if (location === 'perm-100km') return 20000;
    return 0;
  };

  const grandTotal = calculateFoundationTotal() + calculateWallsTotal() + calculateDeliveryTotal();

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {foundation && foundation !== 'net' && (
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-bold text-sm mb-3 text-gray-800">
            Фундамент из {foundation === 'lentochnyj' ? 'ленточного бетона' : foundation === 'stolbchatyj' ? 'винтовых свай' : 'плиты'}
          </h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 font-medium text-gray-600">Наименование</th>
                <th className="text-center py-1 font-medium text-gray-600 w-12">Ед.</th>
                <th className="text-right py-1 font-medium text-gray-600 w-16">Кол-во</th>
                <th className="text-right py-1 font-medium text-gray-600 w-20">Цена</th>
                <th className="text-right py-1 font-medium text-gray-600 w-24">Сумма</th>
              </tr>
            </thead>
            <tbody>
              {foundation === 'lentochnyj' && (
                <>
                  <tr className="border-b bg-gray-50">
                    <td colSpan={5} className="py-1.5 font-semibold text-xs">Фундамент ленточный, с буронабивными сваями</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Бетон В20 М250(на щебне)</td>
                    <td className="text-center py-1.5">м3</td>
                    <td className="text-right py-1.5">7,70</td>
                    <td className="text-right py-1.5">7 100,00</td>
                    <td className="text-right py-1.5 font-medium">54 670,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Дренажная подушка(ПГС)</td>
                    <td className="text-center py-1.5">т</td>
                    <td className="text-right py-1.5">5,00</td>
                    <td className="text-right py-1.5">700,00</td>
                    <td className="text-right py-1.5 font-medium">3 500,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Арматура металлическая(гладкая 10мм)</td>
                    <td className="text-center py-1.5">п.м</td>
                    <td className="text-right py-1.5">200,00</td>
                    <td className="text-right py-1.5">90,00</td>
                    <td className="text-right py-1.5 font-medium">18 000,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Арматура металлическая(8мм)</td>
                    <td className="text-center py-1.5">п.м</td>
                    <td className="text-right py-1.5">200,00</td>
                    <td className="text-right py-1.5">50,00</td>
                    <td className="text-right py-1.5 font-medium">10 000,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Проволока вязальная(1,4мм)</td>
                    <td className="text-center py-1.5">кг</td>
                    <td className="text-right py-1.5">1,00</td>
                    <td className="text-right py-1.5">300,00</td>
                    <td className="text-right py-1.5 font-medium">300,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Доска 1-й сорт(50х200)мм</td>
                    <td className="text-center py-1.5">м3</td>
                    <td className="text-right py-1.5">2,66</td>
                    <td className="text-right py-1.5">18 000,00</td>
                    <td className="text-right py-1.5 font-medium">47 790,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Гвозди(4х100)мм</td>
                    <td className="text-center py-1.5">кг</td>
                    <td className="text-right py-1.5">15,00</td>
                    <td className="text-right py-1.5">180,00</td>
                    <td className="text-right py-1.5 font-medium">2 700,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Саморезы черные(3,5х90)мм</td>
                    <td className="text-center py-1.5">шт</td>
                    <td className="text-right py-1.5">500,00</td>
                    <td className="text-right py-1.5">2,50</td>
                    <td className="text-right py-1.5 font-medium">1 250,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Пленка полиэтиленовая(200мк)</td>
                    <td className="text-center py-1.5">м2</td>
                    <td className="text-right py-1.5">40,00</td>
                    <td className="text-right py-1.5">60,00</td>
                    <td className="text-right py-1.5 font-medium">2 400,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Скобы для степлера(№10)</td>
                    <td className="text-center py-1.5">шт</td>
                    <td className="text-right py-1.5">1000,00</td>
                    <td className="text-right py-1.5">0,15</td>
                    <td className="text-right py-1.5 font-medium">150,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Фиксаторы арматуры(35мм)</td>
                    <td className="text-center py-1.5">шт</td>
                    <td className="text-right py-1.5">200,00</td>
                    <td className="text-right py-1.5">6,00</td>
                    <td className="text-right py-1.5 font-medium">1 200,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Труба пластиковая(продухи)160мм</td>
                    <td className="text-center py-1.5">м</td>
                    <td className="text-right py-1.5">1,00</td>
                    <td className="text-right py-1.5">950,00</td>
                    <td className="text-right py-1.5 font-medium">950,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Труба пластиковая(продухи)110мм</td>
                    <td className="text-center py-1.5">м</td>
                    <td className="text-right py-1.5">2,00</td>
                    <td className="text-right py-1.5">800,00</td>
                    <td className="text-right py-1.5 font-medium">1 600,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Услуги ямобура</td>
                    <td className="text-center py-1.5">ч</td>
                    <td className="text-right py-1.5">4,00</td>
                    <td className="text-right py-1.5">1 500,00</td>
                    <td className="text-right py-1.5 font-medium">6 000,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Услуги экскаватора</td>
                    <td className="text-center py-1.5">ч</td>
                    <td className="text-right py-1.5">4,00</td>
                    <td className="text-right py-1.5">1 500,00</td>
                    <td className="text-right py-1.5 font-medium">6 000,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Монтаж фундамента</td>
                    <td className="text-center py-1.5">м3</td>
                    <td className="text-right py-1.5">7,70</td>
                    <td className="text-right py-1.5">10 000,00</td>
                    <td className="text-right py-1.5 font-medium">77 000,00</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого основные работы:</td>
                    <td className="text-right py-2 font-semibold text-blue-700">232 510,00</td>
                  </tr>
                </>
              )}
              {foundation === 'stolbchatyj' && (
                <>
                  <tr className="border-b bg-gray-50">
                    <td colSpan={5} className="py-1.5 font-semibold text-xs">Фундамент из винтовых свай</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Свая винтовая 89/6/300(2,5м)</td>
                    <td className="text-center py-1.5">шт</td>
                    <td className="text-right py-1.5">11,00</td>
                    <td className="text-right py-1.5">2 500,00</td>
                    <td className="text-right py-1.5 font-medium">27 500,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Оголовки для свай съемные(150х150)мм</td>
                    <td className="text-center py-1.5">шт</td>
                    <td className="text-right py-1.5">11,00</td>
                    <td className="text-right py-1.5">500,00</td>
                    <td className="text-right py-1.5 font-medium">5 500,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Услуги ямобура</td>
                    <td className="text-center py-1.5">ч</td>
                    <td className="text-right py-1.5">4,00</td>
                    <td className="text-right py-1.5">1 500,00</td>
                    <td className="text-right py-1.5 font-medium">6 000,00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Монтаж свай</td>
                    <td className="text-center py-1.5">шт</td>
                    <td className="text-right py-1.5">11,00</td>
                    <td className="text-right py-1.5">3 000,00</td>
                    <td className="text-right py-1.5 font-medium">33 000,00</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого основные работы:</td>
                    <td className="text-right py-2 font-semibold text-blue-700">72 000,00</td>
                  </tr>
                </>
              )}
              {foundation === 'plitnyj' && (
                <>
                  <tr className="border-b">
                    <td className="py-1.5">Бетон М300</td>
                    <td className="text-center py-1.5">м3</td>
                    <td className="text-right py-1.5">{formatNumber(area * 0.25)}</td>
                    <td className="text-right py-1.5">4 500,00</td>
                    <td className="text-right py-1.5 font-medium">{formatNumber(area * 0.25 * 4500)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Арматура А500</td>
                    <td className="text-center py-1.5">кг</td>
                    <td className="text-right py-1.5">{formatNumber(area * 15)}</td>
                    <td className="text-right py-1.5">55,00</td>
                    <td className="text-right py-1.5 font-medium">{formatNumber(area * 15 * 55)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1.5">Работы по заливке</td>
                    <td className="text-center py-1.5">м2</td>
                    <td className="text-right py-1.5">{formatNumber(area)}</td>
                    <td className="text-right py-1.5">800,00</td>
                    <td className="text-right py-1.5 font-medium">{formatNumber(area * 800)}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого основные работы:</td>
                    <td className="text-right py-2 font-semibold text-blue-700">72 000,00</td>
                  </tr>
                </>
              )}

              {foundation === 'plitnyj' && (
                <tr className="bg-blue-50">
                  <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого основные работы:</td>
                  <td className="text-right py-2 font-semibold text-blue-700">{formatNumber(area * 0.25 * 4500 + area * 15 * 55 + area * 800)}</td>
                </tr>
              )}
              <tr className="border-b bg-gray-50">
                <td colSpan={5} className="py-1.5 font-semibold text-xs">Обвязка фундамента</td>
              </tr>
              <tr className="border-b">
                <td className="py-1.5">Обвязочный брус(100х200)мм</td>
                <td className="text-center py-1.5">м3</td>
                <td className="text-right py-1.5">0,48</td>
                <td className="text-right py-1.5">18 000,00</td>
                <td className="text-right py-1.5 font-medium">8 640,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-1.5">Рубероид РПП 300</td>
                <td className="text-center py-1.5">м2</td>
                <td className="text-right py-1.5">10,00</td>
                <td className="text-right py-1.5">55,00</td>
                <td className="text-right py-1.5 font-medium">550,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-1.5">Антисептик зимний "Фенелакс"(-15С)</td>
                <td className="text-center py-1.5">л</td>
                <td className="text-right py-1.5">5,00</td>
                <td className="text-right py-1.5">90,00</td>
                <td className="text-right py-1.5 font-medium">450,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-1.5">Шуруп "глухарь"(8х40) 1кг/ми</td>
                <td className="text-center py-1.5">шт</td>
                <td className="text-right py-1.5">22,00</td>
                <td className="text-right py-1.5">3,50</td>
                <td className="text-right py-1.5 font-medium">77,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-1.5">Скобы строительные(8х250)</td>
                <td className="text-center py-1.5">шт</td>
                <td className="text-right py-1.5">6,00</td>
                <td className="text-right py-1.5">50,00</td>
                <td className="text-right py-1.5 font-medium">300,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-1.5">Монтаж обвязки</td>
                <td className="text-center py-1.5">м3</td>
                <td className="text-right py-1.5">0,48</td>
                <td className="text-right py-1.5">7 500,00</td>
                <td className="text-right py-1.5 font-medium">3 600,00</td>
              </tr>
              <tr className="bg-blue-50">
                <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого обвязка:</td>
                <td className="text-right py-2 font-semibold text-blue-700">13 617,00</td>
              </tr>
              <tr className="bg-yellow-50">
                <td colSpan={4} className="py-2 font-bold text-right">Итого по разделу:</td>
                <td className="text-right py-2 font-bold text-green-700">
                  {foundation === 'lentochnyj' && '85 617,00'}
                  {foundation === 'stolbchatyj' && '63 117,00'}
                  {foundation === 'plitnyj' && formatNumber(area * 0.25 * 4500 + area * 15 * 55 + area * 800 + 13617)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {material && (
        <>
          <div className="border rounded-lg p-4 bg-white">
            <h3 className="font-bold text-sm mb-3 text-gray-800">
              Сруб из {material === 'bревно' ? 'бревна' : 'бруса'}
            </h3>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b">
                  <td className="py-1.5">{material === 'bревно' ? 'Бревно сруба' : 'Брус профилированный'}</td>
                  <td className="text-center py-1.5">м3</td>
                  <td className="text-right py-1.5">{formatNumber(wallVolume)}</td>
                  <td className="text-right py-1.5">{material === 'bревно' ? '19 500,00' : '17 500,00'}</td>
                  <td className="text-right py-1.5 font-medium">
                    {formatNumber(wallVolume * (material === 'bревно' ? 19500 : 17500))}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5">Бревно перегородки</td>
                  <td className="text-center py-1.5">м3</td>
                  <td className="text-right py-1.5">1,70</td>
                  <td className="text-right py-1.5">17 500,00</td>
                  <td className="text-right py-1.5 font-medium">29 750,00</td>
                </tr>
                <tr className="bg-blue-50">
                  <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого материалы сруба:</td>
                  <td className="text-right py-2 font-semibold text-blue-700">
                    {formatNumber(wallVolume * (material === 'bревно' ? 19500 : 17500) + 29750)}
                  </td>
                </tr>
                <tr className="bg-yellow-50">
                  <td colSpan={4} className="py-2 font-bold text-right">Итого по разделу:</td>
                  <td className="text-right py-2 font-bold text-green-700">
                    {formatNumber(wallVolume * (material === 'bревно' ? 19500 : 17500) + 29750)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border rounded-lg p-4 bg-white">
            <h3 className="font-bold text-sm mb-3 text-gray-800">Общая кубатура</h3>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b">
                  <td className="py-1.5">Джут(150мм)</td>
                  <td className="text-center py-1.5">п.м</td>
                  <td className="text-right py-1.5">600,00</td>
                  <td className="text-right py-1.5">21,00</td>
                  <td className="text-right py-1.5 font-medium">12 600,00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5">Шкант березовый(24х1200)мм</td>
                  <td className="text-center py-1.5">шт</td>
                  <td className="text-right py-1.5">80,00</td>
                  <td className="text-right py-1.5">35,00</td>
                  <td className="text-right py-1.5 font-medium">2 800,00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5">Скобы для степлера(№10)</td>
                  <td className="text-center py-1.5">шт</td>
                  <td className="text-right py-1.5">3 000,00</td>
                  <td className="text-right py-1.5">0,15</td>
                  <td className="text-right py-1.5 font-medium">450,00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5">Скобы строительные(8х250)</td>
                  <td className="text-center py-1.5">шт</td>
                  <td className="text-right py-1.5">31,00</td>
                  <td className="text-right py-1.5">50,00</td>
                  <td className="text-right py-1.5 font-medium">1 550,00</td>
                </tr>
                <tr className="bg-blue-50">
                  <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого расходные материалы:</td>
                  <td className="text-right py-2 font-semibold text-blue-700">17 400,00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-1.5">Монтаж сруба</td>
                  <td className="text-center py-1.5">м3</td>
                  <td className="text-right py-1.5">{formatNumber(wallVolume + 1.7)}</td>
                  <td className="text-right py-1.5">8 500,00</td>
                  <td className="text-right py-1.5 font-medium">{formatNumber((wallVolume + 1.7) * 8500)}</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td colSpan={4} className="py-2 font-bold text-right">Итого по разделу:</td>
                  <td className="text-right py-2 font-bold text-green-700">
                    {formatNumber(12600 + 2800 + 450 + 1550 + (wallVolume + 1.7) * 8500)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {roof && (
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-bold text-sm mb-3 text-gray-800">Крыша</h3>
          <table className="w-full text-xs">
            <tbody>
              <tr className="border-b">
                <td className="py-1.5">Доска 1-й сорт(50х150)мм</td>
                <td className="text-center py-1.5">м3</td>
                <td className="text-right py-1.5">0,88</td>
                <td className="text-right py-1.5">18 000,00</td>
                <td className="text-right py-1.5 font-medium">15 840,00</td>
              </tr>
              <tr className="border-b">
                <td className="py-1.5">
                  {roof === 'metallocherepica' ? 'Металлочерепица' : roof === 'mjagkaja' ? 'Мягкая кровля' : 'Профнастил'}
                </td>
                <td className="text-center py-1.5">м2</td>
                <td className="text-right py-1.5">{formatNumber(area * 1.3)}</td>
                <td className="text-right py-1.5">
                  {roof === 'metallocherepica' ? '680,00' : roof === 'mjagkaja' ? '850,00' : '450,00'}
                </td>
                <td className="text-right py-1.5 font-medium">
                  {formatNumber(area * 1.3 * (roof === 'metallocherepica' ? 680 : roof === 'mjagkaja' ? 850 : 450))}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1.5">Монтаж кровли</td>
                <td className="text-center py-1.5">м2</td>
                <td className="text-right py-1.5">{formatNumber(area * 1.3)}</td>
                <td className="text-right py-1.5">2 500,00</td>
                <td className="text-right py-1.5 font-medium">{formatNumber(area * 1.3 * 2500)}</td>
              </tr>
              <tr className="bg-blue-50">
                <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого материалы крыши:</td>
                <td className="text-right py-2 font-semibold text-blue-700">
                  {formatNumber(15840 + area * 1.3 * (roof === 'metallocherepica' ? 680 : roof === 'mjagkaja' ? 850 : 450))}
                </td>
              </tr>
              <tr className="bg-blue-50">
                <td colSpan={4} className="py-2 text-right font-semibold text-xs">Итого монтаж:</td>
                <td className="text-right py-2 font-semibold text-blue-700">{formatNumber(area * 1.3 * 2500)}</td>
              </tr>
              <tr className="bg-yellow-50">
                <td colSpan={4} className="py-2 font-bold text-right">Итого по разделу:</td>
                <td className="text-right py-2 font-bold text-green-700">
                  {formatNumber(15840 + area * 1.3 * (roof === 'metallocherepica' ? 680 : roof === 'mjagkaja' ? 850 : 450) + area * 1.3 * 2500)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="border-4 border-green-600 rounded-lg p-6 bg-gradient-to-br from-green-50 to-white sticky bottom-0 shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">ИТОГО ПО СМЕТЕ:</h2>
          <div className="text-3xl font-bold text-green-700">{formatNumber(grandTotal)} ₽</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Общая сумма всех разделов работ и материалов</p>
      </div>
    </div>
  );
};

export default EstimateLive;
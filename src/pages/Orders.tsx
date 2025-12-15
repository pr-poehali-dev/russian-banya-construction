import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Order {
  id: number;
  name: string;
  phone: string;
  email: string;
  messenger: string;
  material: string;
  length: string;
  width: string;
  partitions_length: string;
  floors: string;
  foundation: string;
  location: string;
  created_at: string;
  status: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/cba76a16-6247-4333-9605-62ab8c813235');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const materialNames: Record<string, string> = {
    'ocilindrovannoe-brevno': 'Оцилиндрованное бревно',
    'obychnyj-brus': 'Обычный брус',
    'kleenyj-brus': 'Клееный брус'
  };

  const foundationNames: Record<string, string> = {
    'lentochnyj': 'Ленточный фундамент',
    'stolbchatyj': 'Винтовые сваи',
    'net': 'Фундамент уже есть'
  };

  const locationNames: Record<string, string> = {
    'perm': 'Пермь',
    'perm-30km': 'До 30 км от Перми',
    'perm-50km': '30-50 км от Перми',
    'perm-100km': '50-100 км от Перми'
  };

  const messengerNames: Record<string, string> = {
    'whatsapp': 'WhatsApp',
    'telegram': 'Telegram',
    'email': 'Email'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Загрузка заявок...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Заявки с сайта</h1>
          <Button onClick={fetchOrders}>
            <Icon name="RefreshCw" size={20} className="mr-2" />
            Обновить
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-gray-500">Заявок пока нет</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-yellow-400">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">
                      Заявка #{order.id} - {order.name}
                    </CardTitle>
                    <span className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleString('ru-RU')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg border-b pb-2">Контакты</h3>
                      <div className="flex items-center gap-2">
                        <Icon name="User" size={16} className="text-gray-500" />
                        <span>{order.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Phone" size={16} className="text-gray-500" />
                        <a href={`tel:${order.phone}`} className="text-blue-600 hover:underline">
                          {order.phone}
                        </a>
                      </div>
                      {order.email && (
                        <div className="flex items-center gap-2">
                          <Icon name="Mail" size={16} className="text-gray-500" />
                          <a href={`mailto:${order.email}`} className="text-blue-600 hover:underline">
                            {order.email}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Icon name="MessageCircle" size={16} className="text-gray-500" />
                        <span>{messengerNames[order.messenger] || order.messenger}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-lg border-b pb-2">Параметры бани</h3>
                      <div className="flex items-start gap-2">
                        <Icon name="Box" size={16} className="text-gray-500 mt-1" />
                        <div>
                          <div className="font-semibold">Материал:</div>
                          <div>{materialNames[order.material] || order.material}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Ruler" size={16} className="text-gray-500 mt-1" />
                        <div>
                          <div className="font-semibold">Размеры:</div>
                          <div>{order.length} x {order.width} м, этажность: {order.floors}</div>
                          {order.partitions_length && (
                            <div className="text-sm text-gray-600">
                              Перегородки: {order.partitions_length} м
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Layers" size={16} className="text-gray-500 mt-1" />
                        <div>
                          <div className="font-semibold">Фундамент:</div>
                          <div>{foundationNames[order.foundation] || order.foundation}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="MapPin" size={16} className="text-gray-500 mt-1" />
                        <div>
                          <div className="font-semibold">Место строительства:</div>
                          <div>{locationNames[order.location] || order.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
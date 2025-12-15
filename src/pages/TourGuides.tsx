import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Guide {
  id: number;
  name: string;
  location: string;
  languages: string[];
  rating: number;
  price: number;
  image: string;
  specialization: string;
}

const TourGuides = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [guides] = useState<Guide[]>([
    {
      id: 1,
      name: 'Анна Петрова',
      location: 'Санкт-Петербург',
      languages: ['Русский', 'Английский', 'Французский'],
      rating: 4.9,
      price: 3500,
      image: 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/guide1.jpg',
      specialization: 'Исторические экскурсии'
    },
    {
      id: 2,
      name: 'Дмитрий Смирнов',
      location: 'Москва',
      languages: ['Русский', 'Английский', 'Немецкий'],
      rating: 4.8,
      price: 4000,
      image: 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/guide2.jpg',
      specialization: 'Архитектура и музеи'
    },
    {
      id: 3,
      name: 'Елена Волкова',
      location: 'Казань',
      languages: ['Русский', 'Английский', 'Татарский'],
      rating: 5.0,
      price: 3000,
      image: 'https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/guide3.jpg',
      specialization: 'Культурные туры'
    },
  ]);

  const filteredGuides = guides.filter(guide => {
    const matchLocation = searchLocation === '' || guide.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchLanguage = selectedLanguage === '' || guide.languages.includes(selectedLanguage);
    return matchLocation && matchLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Найди своего гида
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Профессиональные экскурсоводы для незабываемых путешествий по России
          </p>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Search" size={24} className="text-blue-600" />
              Поиск гида
            </CardTitle>
            <CardDescription>
              Найдите идеального экскурсовода для вашего путешествия
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Город
                </label>
                <div className="relative">
                  <Icon name="MapPin" size={20} className="absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Москва, Санкт-Петербург..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Язык
                </label>
                <div className="relative">
                  <Icon name="Languages" size={20} className="absolute left-3 top-3 text-gray-400" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Все языки</option>
                    <option value="Русский">Русский</option>
                    <option value="Английский">Английский</option>
                    <option value="Немецкий">Немецкий</option>
                    <option value="Французский">Французский</option>
                    <option value="Татарский">Татарский</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-100 to-cyan-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="User" size={80} className="text-blue-300" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{guide.name}</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Icon name="Star" size={18} fill="currentColor" />
                    <span className="text-sm font-normal text-gray-700">{guide.rating}</span>
                  </div>
                </CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-blue-600" />
                    <span>{guide.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Briefcase" size={16} className="text-blue-600" />
                    <span>{guide.specialization}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Языки:</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {guide.price.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-xs text-gray-500">за экскурсию</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Связаться
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <Icon name="SearchX" size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">
              Гиды не найдены. Попробуйте изменить параметры поиска.
            </p>
          </div>
        )}

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center border-blue-200">
            <CardHeader>
              <Icon name="ShieldCheck" size={48} className="mx-auto text-blue-600 mb-2" />
              <CardTitle>Проверенные гиды</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Все экскурсоводы имеют лицензии и подтверждённые отзывы
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-blue-200">
            <CardHeader>
              <Icon name="CreditCard" size={48} className="mx-auto text-blue-600 mb-2" />
              <CardTitle>Безопасная оплата</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Оплачивайте услуги безопасно через защищённую систему
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-blue-200">
            <CardHeader>
              <Icon name="Clock" size={48} className="mx-auto text-blue-600 mb-2" />
              <CardTitle>Поддержка 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Наша команда всегда готова помочь вам в любое время
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TourGuides;
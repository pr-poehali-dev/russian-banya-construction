import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer id="contacts" className="bg-yellow-500 text-black py-12 px-4 sm:px-6 w-full overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-black">Пермский Пар</h3>
            <p className="text-black text-sm">
              Строительство и модернизация бань премиум-класса в Перми и Пермском крае
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-black text-sm">
              <a href="tel:+73422984030" className="flex items-center justify-center sm:justify-start gap-2 hover:text-gray-700 transition-colors">
                <Icon name="Phone" size={16} />
                +7 (342) 298-40-30
              </a>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Icon name="Clock" size={16} />
                <span>Пн-Пт 08:00-20:00</span>
              </div>
              <a href="tel:+79824900900" className="flex items-center justify-center sm:justify-start gap-2 hover:text-gray-700 transition-colors">
                <Icon name="Phone" size={16} />
                +7 (982) 490-09-00
              </a>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Icon name="Clock" size={16} />
                <span>Сб-Вс 10:00-15:00</span>
              </div>
              <a href="mailto:perm-par@mail.ru" className="flex items-center justify-center sm:justify-start gap-2 hover:text-gray-700 transition-colors">
                <Icon name="Mail" size={16} />
                perm-par@mail.ru
              </a>
              <div className="flex items-center justify-center sm:justify-start gap-2 whitespace-nowrap">
                <Icon name="MapPin" size={16} />
                <span>Пермь, Пермский край</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Мессенджеры</h4>
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex gap-3 flex-wrap justify-center md:justify-end">
                <a href="https://wa.me/79824900900" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <Icon name="MessageCircle" size={20} className="text-white" />
                </a>
                <a href="https://t.me/+79824900900" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon name="Send" size={20} className="text-white" />
                </a>
                <a href="https://my.mail.ru/mail/perm-par/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden">
                  <img src="https://cdn.poehali.dev/files/IlwnOob3_b8V56ug0ufBKQPFI6Di_pNsKHZUm7_yDwj0wSGwJVIhHVATvJ5AhTO56sg4PhSTOS7DvQ5swJRUSIh8.jpg" alt="МАКС" className="w-full h-full object-cover" />
                </a>
                <a href="tel:+79824900900" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Icon name="Phone" size={20} className="text-white" />
                </a>
              </div>
              <a href="tel:+79824900900" className="text-lg font-bold text-black hover:text-gray-700 transition-colors">
                +7 (982) 490-09-00
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-black/20 mt-8 pt-8 text-center text-black text-sm">
          <p>&copy; 2020г Пермский Пар. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 w-full overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 text-primary">Пермский Пар</h3>
            <p className="text-gray-400 text-sm">
              Строительство и модернизация бань премиум-класса в Перми и Пермском крае
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <a href="tel:+79824900900" className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
                <Icon name="Phone" size={16} />
                +7 (982) 490-09-00
              </a>
              <div className="flex items-center justify-center gap-2">
                <Icon name="Clock" size={16} />
                <span>Пн-Пт 08:00-20:00</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>Сб-Вс 10:00-15:00</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Icon name="MapPin" size={16} />
                <span>Пермь, Пермский край</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Социальные сети</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Icon name="Send" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Пермский Пар. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

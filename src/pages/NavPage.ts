import Block from '../../system/Block';

export default class NavPage extends Block {
    protected template = `
          <main>
              <h1>Страницы проекта</h1>

              <nav aria-label="Авторизация" class="group">
                  <div class="group-title">Авторизация</div>
                  <ul>
                      <li><a href="/?page=login">Вход</a></li>
                      <li><a href="/?page=registration">Регистрация</a></li>
                  </ul>
              </nav>

              <nav aria-label="Чат" class="group">
                  <div class="group-title">Чат</div>
                  <ul>
                      <li><a href="/?page=messenger">Мессенджер</a></li>
                  </ul>
              </nav>

              <nav aria-label="Профиль" class="group">
                  <div class="group-title">Профиль</div>
                  <ul>
                      <li><a href="/?page=profile">Просмотр профиля</a></li>
                      <li><a href="/?page=changeProfile">Редактирование данных</a></li>
                      <li><a href="/?page=changePassword">Изменение пароля</a></li>
                  </ul>
              </nav>

              <nav aria-label="Ошибки" class="group">
                  <div class="group-title">Ошибки</div>
                  <ul>
                      <li><a href="/?page=404">404</a></li>
                      <li><a href="/?page=500">500</a></li>
                  </ul>
              </nav>

              <nav aria-label="Модальные окна" class="group">
                  <div class="group-title">Модальные окна</div>
                  <ul>
                      <li><a href="/?page=messengerAddUser">Добавить пользователя</a></li>
                      <li><a href="/?page=messengerRemoveUser">Удалить пользователя</a></li>
                      <li><a href="/?page=changeProfileUpload">Загрузка аватара</a></li>
                  </ul>
              </nav>
          </main>
      `;
}

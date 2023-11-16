import image from "../../../assets/image.png";
import style from "./Main.module.scss";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Main = () => {
  const users: User[] = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },

    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Sincere@april.biz",
    },
  ];

  return (
    <div className={style.Main}>
      <div className={style.header}>
        <div className={style.logo}>Жилфонд</div>
        <div className={style.user}>Пользователь</div>
      </div>
      <div className={style.page_main}>
        <div className={style.side_bar}>
          <div className={style.title}>Поиск сотрудников</div>
          <input
            type="text"
            className={style.input_search}
            placeholder="Введите Id или имя"
          />
          <div className={style.title}>Результаты</div>
          <div className={style.results_of_search}>
            {users.length ? (
              users.map((user) => (
                <div className={style.user_container} key={user.id}>
                  <div className={style.image}>
                    <img src={image} alt="empty_image" />
                  </div>
                  <div className={style.info_user}>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              ))
            ) : (
              <div>начните поиск </div>
            )}
          </div>
        </div>
        <div className={style.main_part}></div>
      </div>
    </div>
  );
};

export default Main;

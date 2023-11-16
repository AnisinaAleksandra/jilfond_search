import style from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.logo}>Жилфонд</div>
      <div className={style.user}>Пользователь</div>
    </div>
  );
};

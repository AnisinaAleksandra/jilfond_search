import { useEffect, useState } from "react";
import image from "../../../assets/image.png";
import style from "./Main.module.scss";
import { Header } from "../../../widgets/Header";
import { ToastError } from "../../../component/Toast/toastError";
import { toast } from "react-toastify";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const Main = () => {
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);
  const [loader, setLoader] = useState(false);

  const textOrLoader = loader ? (
    <div className={style.lds_ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div>начните поиск </div>
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const params = new URLSearchParams();
        searchResults.forEach((el) => params.append("id", String(el.id)));
        const url: string = `https://jsonplaceholder.typicode.com/users?${params.toString()}`;
        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        if (listOfUsers.length > data.length) {
          setSearchResults(data);
        } else if (listOfUsers.length < data.length) {
          setListOfUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    fetchUsers();
    if (searchTerm.length === 0) {
      setUserSelected(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const searchTermArr: string[] = searchTerm
      .split(" ")
      .filter((el) => el !== "");
    setLoader(true);
    setTimeout(() => {
      setSearchResults(searchUsers(searchTermArr));
      setLoader(false);
    }, 2000);
  };

  function searchUsers(searchQueryArr: string[]): User[] {
    const searchTermArr: string[] = searchQueryArr.map((el: string) =>
      el.toLowerCase()
    );
    const filteredUsers: User[] = [];
    if (searchTermArr.length >= 1) {
      for (let i = 0; i < searchTermArr.length; i++) {
        const el = searchTermArr[i];
        const filteredUser: User[] = listOfUsers.filter((user) => {
          return (
            user.id.toString() === el ||
            user.username.toLowerCase().includes(el) ||
            user.name.toLowerCase().includes(el)
          );
        });
        if (
          filteredUsers!.find((item) => filteredUser[0]!.name === item.name) ===
          undefined
        ) {
          filteredUsers.push(filteredUser[0]);
        }
      }
    }
    return filteredUsers;
  }
  const selectHandle = (user: User) => {
    setUserSelected(user);
  };

  return (
    <div className={style.Main}>
      <Header />
      <ToastError />
      <div className={style.page_main}>
        <div className={style.side_bar}>
          <div className={style.top_part}>
            <div className={style.title}>Поиск сотрудников</div>
            <input
              type="text"
              className={style.input_search}
              placeholder="Введите Id или имя"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <div className={style.title}>Результаты</div>
          </div>

          <div className={style.results_of_search}>
            {searchResults.length
              ? searchResults.map((user) => (
                  <div
                    className={style.user_container}
                    key={user.id}
                    onClick={() => selectHandle(user)}
                  >
                    <div className={style.image}>
                      <img src={image} alt="empty_image" />
                    </div>
                    <div className={style.info_user}>
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                    </div>
                  </div>
                ))
              : textOrLoader}
          </div>
        </div>
        <div className={style.main_part}>
          {userSelected ? (
            <>
              <div className={style.image_empty}>
                <img src={image} alt="empty_image" />
              </div>
              <div className={style.user_info}>
                <div className={style.field_info}>{userSelected!.name}</div>
                <div className={style.field_info}>
                  email: <span> {userSelected!.email}</span>
                </div>
                <div className={style.field_info}>
                  phone: <span> {userSelected!.phone}</span>
                </div>
                <div className={style.field_info_title}>О себе</div>
                <div className={style.field_info}>
                  {userSelected!.company.catchPhrase}
                </div>
              </div>
            </>
          ) : (
            <div>Выберите сотрудника, чтобы посмотреть его профиль</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;

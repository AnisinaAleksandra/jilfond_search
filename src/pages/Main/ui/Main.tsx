import { useEffect, useState } from "react";
import image from "../../../assets/image.png";
import style from "./Main.module.scss";
import { Header } from "../../../widgets/Header";

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
  const users: User[] = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ];
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  console.log(userSelected);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setSearchResults(searchUsers(searchTerm));
  };
  const selectHandle = (user: User) => {
    setUserSelected(user);
  };
  function searchUsers(searchQuery: string): User[] {
    const searchTerm = searchQuery.toLowerCase();
    let filteredUsers: User[] = [];
    const searchTermArr: string[] = searchTerm
      .split(" ")
      .filter((el) => el !== "");
    if (searchTermArr.length > 1) {
      for (let i = 0; i < searchTermArr.length; i++) {
        const el = searchTermArr[i];
        const filteredUser: User[] = users.filter((user) => {
          return (
            user.id.toString() === el ||
            user.username.toLowerCase().includes(el) ||
            user.name.toLowerCase().includes(el)
          );
        });
        if (
          filteredUsers.find((item) => filteredUser[0].name === item.name) ===
          undefined
        ) {
          filteredUsers.push(filteredUser[0]);
        }
      }
    } else {
      filteredUsers = users.filter((user) => {
        return (
          user.id.toString() === searchTerm ||
          user.username.toLowerCase().includes(searchTerm) ||
          user.name.toLowerCase().includes(searchTerm)
        );
      });
    }
    if (searchTerm.length === 0) {
      return [];
    }
    return filteredUsers;
  }

  const userIds = [1, 2]; // IDs for the query parameter

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const params = new URLSearchParams();
        if (searchTerm !== "") {
          userIds.forEach((id) => params.append("id", String(id)));
        }
        const url: string =
          searchTerm === ""
            ? `https://jsonplaceholder.typicode.com/users`
            : `https://jsonplaceholder.typicode.com/users?${params.toString()}`;
        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  return (
    <div className={style.Main}>
      <Header />
      <div className={style.page_main}>
        <div className={style.side_bar}>
          <div className={style.title}>Поиск сотрудников</div>
          <input
            type="text"
            className={style.input_search}
            placeholder="Введите Id или имя"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div className={style.title}>Результаты</div>
          <div className={style.results_of_search}>
            {searchResults.length ? (
              searchResults.map((user) => (
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
            ) : (
              <div>начните поиск </div>
            )}
          </div>
        </div>
        <div className={style.main_part}>
          {userSelected ? (
            <>
              <div className={style.image_empty}>
                <img src={image} alt="empty_image" />
              </div>
              <div className={style.user_info}>
                <div className={style.field_info}>{userSelected.name}</div>
                <div className={style.field_info}>
                  email: <span> {userSelected.email}</span>
                </div>
                <div className={style.field_info}>
                  phone: <span> {userSelected.phone}</span>
                </div>
                <div className={style.field_info_title}>О себе</div>
                <div className={style.field_info}>
                  {userSelected.company.catchPhrase}
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

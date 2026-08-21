import { useMemo, useState, useEffect } from "react";
import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Indian Polity - M. Laxmikanth",
    category: "Books",
    price: 650,
    condition: "Good",
    location: "Old Rajinder Nagar",
    image:
      "https://www.clankart.com/user-uploads/advert/Upsc_ssc_cgl_exam_kae_liyae_indian_polity_m_Lakshmikant1727691261844.jpg",
    description: "Indian Polity book for UPSC preparation.",
  },
  {
    id: 2,
    name: "NCERT Books Set - Class 6 to 12",
    category: "Books",
    price: 900,
    condition: "Good",
    location: "Mukherjee Nagar",
    image:
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAALQQAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAsQAAAHQAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAIAAgAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAALSW1kYXQSAAoJGB2sObBAgIGhMrEWEgACiiihQNtH9t2qnvaC0hJi2j6FGiZuYBKAuEQJ2PJRFeij0RRZ8Pde1NjK78NSMyrfuOk3bXml5tcJKrZhtSZWqoy0MehPWo0kRNNjd8bGKUSHpcs5U1wH5wkFtKnEOVi37O6iL/I6YYxK1A5u0w9enB7+1MmBQ/U2/yt5NVtSjwIxUtaAbb9O75BlQwjklwjkpNEw9ECm+ZFbTZNsp2PXkzbnIJjvsVvl/YzixXEJ8CjADsksPFH2cyIpO8ms/XiJ23ajJWyhvedPOVs63z3fCE5IpFtRZK+RlfaCh5I75IKJNU6EJEk4CkRdzs1RDf0ujIB0kX/HcsNdYaGHbLaLvK7A6nguD8/DhBCh41vPwvK6glh8HYkD8T/Iva53BH6kddR/3C1EcrRSTcRB+iIBooPkM9KH9wDuqPTcIQ4kEbz5y7pmyXwxlM9iPcARAG0ZAOgGdfrumhyBkMUnSwlUry1tp4K59+ZPt/i6g2mnT5YfPzVKDaOTX2/smdwaZSTS4KdIz6vgcs8xa0dC70+rUQSsSgU+UWwp3wHYyvyovaWUMi8i89eWdCQualai2ykqkkKK5uVWriYVvhdKIU0SasBPDeZZoyhasrlAjem1CPjohxktQb07MuhHO5FLTuhVuuW1TUoH0P7FSEOddpOsPL7z+itgMW1W3BlcHM56VooUydE9Zszpe7nlR//qfZegDSyEdf2gt9gwD3BNBtFl0hIorJXntVDUp9eZZff2pi2BWM0/uAQTvQ7odu2mkuQzwIvXQt8tKt+m5Rg7nWt9MmhNSyJ4oodO8YC9654L4zDSNhApAhN7uOqHtg6yIbxtdhtwuaND6KqqagPu3mP24856PtpuNGuVQeEeaWqxZabmj7t5PRByag/pxmM8JGPXwmDH4RWmhKMogGHojEoI3dtnSaF68DHpbT1bWFY7cipacpZ6JWkizvV37F/GR4izCYg+vRYLtkp4BDhv6UIoCZbYYh4N4BTBjBxrhf/0YHKvEsLH9DoA6PBxJPOJ2Prg88SgtMbNm3KleWgIXJfhTrg0H17GolSxnu+Oe4uzBYosCC/AcQZyuk0gCObhgh38DCj1Ezlm0nzZvWUqDTrWPhxtocHLTKcaL2M/3opqUiXAfqukA8ty3Xigwg/5fLpbDz7xSw3LPAAUy9BVwTeC2GuHEwlnBG7Ic8t4Z361q5B5uf8j0WK4RwdHjD92GqaoZKXOH59Hu1rwWfFJ5AYS5eb6RZVe+jkdqUK6yisdDEAa78ftsWE+5vVdeV1jy9gjwYD39IjdaUq9s1H7DboFzfJRx+9mIBwXfVqFdFxJCkSUJdE8tSMwLijnJeNCu8qUVxaxPEilDW0iL06pIVoPQ5e0soHBfMp/i4ft+xbeZ/JJ0upr8dc8lKVcVXu41vZrmFEX8/q6QG2vBh/PMnqJTnoWT9XaWikABuvIKjViS7UhKBgOByGLuLj4ED1LnfJEsgj6a9hGsQnMywT1E+lZw9EbL3eLljwN54UKYv1Ni0Y43jU8lnPCj80zn7I5aVaaDYlzePWmyk7lDdznm4rT+AUBzcil88ByugkEKJF87EyThkDOIxR+1lmMaCM5Wq62yoPHtwLyVxe1LFC+R8cFlcboWDRMEZoW5gnRzgHWh0mrIxGIVQI5nitC4Ydc+aJ7MNsRwC9mgT0wYPoZqDUHqhk/1sLxt5enf7Zby1nMOKBt3lHIaokGGT0hALJPcbYAWG0sUeCdfPcwHCrCMjL8eSa04XpYcKTDQZQX/zzYDuxPeMG0nw3xGy6zZzkErYS/HylMjlvvOM0737EZOYtyYPuOq3GFQjLaeL6uITp2xlRqJHuAcJz0kE0H7gDPkXdHAynDrY3uu0R1mZe0yr7+zQvps7mEPyjw0xLTI6XdKP/Mz6CdYBJv7wWGveaImzYsE83fsDzbTqEx3onRkyKp+TYR3PCWmF7tSNmab1uRrwfmMs5zubNGjMy0fKUUJw+PV7Nb1WzODB7VZiFMkeJdJWVQGaFPUuo7QlwmQ0AAqaEXZ7VVXOD4fnC78uqk9axW870C8f+68hzvTLh1jaf4BXT3VsKTOboOLApKdROfhTvmNdH6xZS54KgmX81+q9O5N/7W4jwjIidQpocvhaNHwoP56spuOrF7LYYW9SuAOrnN56W/X676EYhFzLPd0hfuQZUjx4c6UkW6rEc9eoF/U1nnaQz64v5uN6WAV/ewHlfV/cSmcTOSjFBGKWyXjUqxkKknjOKGodf+J18eTa9MyF2B+6mT9hfRs07+FYFFFn1KTkYd0urVJE13LFJDSuLuHWR7ySvOP1bPAf8UNgThpX8j2uH/WyqG7wo6QEsE+sXEnSHvoB1S97+6hUpFuCumRtTJFKmELdiCt6DX5f2+iM/3Aux8ccySKMb0JS5kRPAP8yk29+EUpHqTOgMOEhpMigv7Cj0MNA2xgXWE2FoYsFqXajmOr+iQ7anr99uKiuumCFHBhPmYibL4Mxskn7EWOkrYXUSrMDZ5/wcstH/u/4Pj5KxocRqb2G08ShhVvqWQsVXdQ1gEaTa5rv9oKVw60qc9jmAGPHrYWtD2UAWkWvxqFk+QagmNgGf7n9mLIzl7+rSEkVjwOJ6R3+3kqViO6gpRVufYG2tlID4ExU/zqH18gtbRAsR7eKJ2nheDIeHSB64aUpwAf0i7FfuakYYBN1ZyQZF2tYGqoovK3uUISMMLUVlo8JGw455xH3wTfg19RtmRamFbrODFK7i48bONjP5Z12t1EyiaznDW7ecNETLui1bE6cYJ3Ki6DQIr0ANIFHU6Us/Wwxjm2Bus3hOcDFDneflyrVwoYSLsRKmzQAFa1ycTV15xviH7rycyAHOB3h6DFUHmxdN4Y6bfQK6loGe6z2ePgJ0itVEL3oaqofPUuIr4Gvr1IMgBkJ7xNpdAbl79gn9N90V/KbB4DVQacsjjPMmgR/Beojo/1OFDyL0cTNZOAmtvaSnFRr4L5Q98HmTsEMSkvX0+ZXGxfT+bY4iAwHR4h/fd8mqlXqiaSDeubQHAd2qw6mwJ1eirHlyiys3XxqrU27m9z17xZNLvX90+MnYRiEm7ULcz5x7d+7SrwT3smPmPcMMzuRfoCLS1lmBOueaDiFuNuxijn+1e4EwOl2Ke9vYryBwWlrDCxM3PiBTxftWMO9R99vab1VO765CPJ62bg6/C1he2Re5ZQbbgOjo3P/n03GkNnAS+eP4A6C0lkULYgmQ4SSzE0SwWbd6WeVm5bl41jPDtXBocynA6VUiRdLRhVBpC2bXOXPURIvylC31D5eRSpQjCXSjadppylgn9MF28WF93ursF3sAc9HcP1rzdMNIJrJ15EUJWA1APFEj6jvV+b/rehqg8f18VanAEjdM5Mk641pWDRIABhWSgi+0XjBBTKFPlbj8x8Pk8GZIHVcHrfxPmCaVWlnBxH1XdBgJkvwMicZUHYLLO+WNjYoysuZUiBAyaqUBmxNB2Q/+BeHWyim1l5PwY9bcAc9Lovb3JEzUZ6BbevhfIXpG6/9jtjFJK4M9hsNp5kF7Hr44Y24Na9NkKW17hqNfXWgamjz87xNXl8gZRVRS5a1EKt3ZD9+6c1Vfzh9VA6pPA7blMypHtf4FyAQGMyk5qxEpSj2JhVWWroZpWgW4MdA3me177EYbtY5i04f3tJVi3+4g2OPPke7Owi1fv/SWa2jl21gUUHaMp2dtlyRJgbpeL8RjBF5+wmcOmlMP5h6y5EHIUWATNRfdhFv1RJP0sqiMBqa99Ni+2soyu7SJ6yxqSNLs8aE6QJZN3f3RCYyPj4dYeneVjY97Q",
    description: "Useful NCERT collection for UPSC foundation preparation.",
  },
  {
    id: 3,
    name: "A Brief History of Modern India - Spectrum",
    category: "Books",
    price: 450,
    condition: "Like New",
    location: "Old Rajinder Nagar",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800",
    description: "Standard modern history book for UPSC preparation.",
  },
  {
    id: 4,
    name: "Indian Economy - Ramesh Singh",
    category: "Books",
    price: 550,
    condition: "Good",
    location: "Laxmi Nagar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6954nj6Ldll5JWD8mThyyEBMb8MKNvZ32ulLdlHaexQ&s",
    description: "UPSC economy preparation book.",
  },
  {
    id: 5,
    name: "UPSC Handwritten GS Notes",
    category: "Notes",
    price: 700,
    condition: "Good",
    location: "Mukherjee Nagar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ_wEwNBj5CpT0xFVX9TVpx6xK5CT7MebyvP2FvOtKEg&s=10",
    description: "Organized handwritten GS notes for UPSC preparation.",
  },
  {
    id: 6,
    name: "Current Affairs Notes 2026",
    category: "Notes",
    price: 350,
    condition: "Like New",
    location: "Patel Nagar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW4zEGmv20Ec8MvoxYmZnznI7DiWd-rPdBOyCxPGp4Mw&s",
    description: "Monthly current affairs notes for UPSC aspirants.",
  },
  {
    id: 7,
    name: "UPSC Prelims Test Series",
    category: "Notes",
    price: 500,
    condition: "Like New",
    location: "Old Rajinder Nagar",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    description: "Prelims practice and test material.",
  },
  {
    id: 8,
    name: "Study Table",
    category: "Furniture",
    price: 2500,
    condition: "Like New",
    location: "Mukherjee Nagar",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ4RvoSdIs8r6C6L1jATVXRH0LjtsLwn3B77731Es5udsGPgRBrIHHP6seORqOtW2ipG85vtPj7yM5XlW6T11InDpLZKpWUGWex6OJAIiyP",
    description: "Spacious study table suitable for long study sessions.",
  },
  {
    id: 9,
    name: "Ergonomic Study Chair",
    category: "Furniture",
    price: 1800,
    condition: "Good",
    location: "GTB Nagar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyGylgdHqQtOtYX2abP1VRgeu2IP61EM90Qp3lcINh4Q&s=10",
    description: "Comfortable chair for study and work.",
  },
  {
    id: 10,
    name: "Bookshelf",
    category: "Furniture",
    price: 2200,
    condition: "Good",
    location: "Old Rajinder Nagar",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800",
    description: "Compact bookshelf for books and study material.",
  },
  {
    id: 11,
    name: "Study Lamp",
    category: "Electronics",
    price: 700,
    condition: "Like New",
    location: "Patel Nagar",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    description: "LED study lamp suitable for night study.",
  },
  {
    id: 12,
    name: "Air Cooler",
    category: "Appliances",
    price: 3500,
    condition: "Good",
    location: "Karol Bagh",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT98Ih6RbNy-Fk-M7y_avOCo66RSw9qKN--J9bPtR17Eg&s=10",
    description: "Used air cooler in working condition.",
  },
  {
    id: 13,
    name: "Electric Kettle",
    category: "Appliances",
    price: 900,
    condition: "Good",
    location: "Patel Nagar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwfp5Gi4N1uV09ADsM9JCz2hLDLxi3xilzeI9c1NQ9Yg&s=10",
    description: "Electric kettle suitable for hostel or PG.",
  },
  {
    id: 14,
    name: "Book Stand",
    category: "Accessories",
    price: 300,
    condition: "Like New",
    location: "Mukherjee Nagar",
    image:
      "https://suspire.in/cdn/shop/files/Book_Rack_Big_lifestyle_3_logo_44312dcb-e921-4ca3-8464-49fdbf5fc5d1-565382_1400x.jpg?v=1770986679",
    description: "Adjustable book stand for comfortable reading.",
  },
  {
    id: 15,
    name: "UPSC Wall Map",
    category: "Accessories",
    price: 250,
    condition: "Like New",
    location: "Old Rajinder Nagar",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800",
    description: "India and world map for UPSC preparation.",
  },
  {
    id: 16,
    name: "Whiteboard with Marker Set",
    category: "Accessories",
    price: 600,
    condition: "Good",
    location: "Laxmi Nagar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0VGCQQ8S56-K7vytphU-EWk8fSzKYgPSbxX2RLMcEAg&s=10",
    description: "Useful whiteboard for revision and planning.",
  },
  {
    id: 17,
    name: "Stationery Study Kit",
    category: "Accessories",
    price: 400,
    condition: "Like New",
    location: "GTB Nagar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf4UYdpIJ-eui5ZTz4FbSts2BnfGPO92VsxBAyo4VI8A&s=10",
    description: "Study stationery kit for daily preparation.",
  },
  {
    id: 18,
    name: "Room Heater",
    category: "Appliances",
    price: 1200,
    condition: "Good",
    location: "Patel Nagar",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThK0cDge-Z5F0TeN3LXZoMZo4YCFdos-_tieBF_-Ewrw&s=10",
    description: "Compact room heater suitable for winter.",
  },
];
const rooms = [
  {
    id: 1,
    title: "PG and Single Rooms for Rent",
    location: "Old Rajinder Nagar",
    price: 9000,
  },
  {
    id: 2,
    title: "Affordable PG for UPSC Aspirants",
    location: "Mukherjee Nagar",
    price: 7500,
  },
];

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("upsc_products");
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts);
      } catch {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  const [activePage, setActivePage] = useState("Home");

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("upsc_logged_in") === "true"
  );
  const [loggedUser, setLoggedUser] = useState(
    () => localStorage.getItem("upsc_user") || ""
  );
  const [authMode, setAuthMode] = useState("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recent");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [saved, setSaved] = useState([]);
  const [showAreas, setShowAreas] = useState(false);
  const [activeChatProduct, setActiveChatProduct] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [playingPodcast, setPlayingPodcast] = useState(null);
  const [pausedPodcast, setPausedPodcast] = useState(false);
  const [roomSearch, setRoomSearch] = useState("");
  const [roomSort, setRoomSort] = useState("Newest First");
  const [roomArea, setRoomArea] = useState("All Areas");
  const [roomType, setRoomType] = useState("All Types");
  const [roomGender, setRoomGender] = useState("Any");
  const [maxRent, setMaxRent] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    localStorage.setItem("upsc_products", JSON.stringify(products));
  }, [products]);

  const [sellForm, setSellForm] = useState({
    name: "",
    price: "",
    category: "Books",
    location: "",
    condition: "Good",
    image: "",
    description: "",
  });

  const categories = [
    "All",
    "Furniture",
    "Appliances",
    "Electronics",
    "Books",
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    if (search.trim()) {
      const text = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(text) ||
          item.category.toLowerCase().includes(text) ||
          item.location.toLowerCase().includes(text)
      );
    }

    if (selectedArea !== "All Areas") {
      result = result.filter(
        (item) => item.location === selectedArea
      );
    }

    if (sort === "Low → High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "High → Low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, search, selectedArea, sort]);

  function toggleSaved(id) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function openProduct(product) {
    setSelectedProduct(product);
  }

  function goHome() {
    setSelectedProduct(null);
    setSelectedRoom(null);
    setActivePage("Home");
  }

  function openRoom(room) {
    setSelectedProduct(null);
    setSelectedRoom(room);
  }

  function backToRooms() {
    setSelectedRoom(null);
    setActivePage("Rooms");
  }

  function handleSellChange(e) {
    const { name, value } = e.target;

    setSellForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handlePostListing(e) {
    e.preventDefault();

    if (
      !sellForm.name.trim() ||
      !sellForm.price ||
      !sellForm.location.trim()
    ) {
      alert("Please fill Product Name, Price and Location.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: sellForm.name.trim(),
      category: sellForm.category,
      price: Number(sellForm.price),
      condition: sellForm.condition,
      location: sellForm.location.trim(),
      image:
        sellForm.image.trim() ||
        (sellForm.name.toLowerCase().includes("table")
          ? "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
          : sellForm.name.toLowerCase().includes("chair")
          ? "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800"
          : sellForm.name.toLowerCase().includes("lamp")
          ? "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800"
          : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"),
      description:
        sellForm.description.trim() ||
        "Product listed on UPSC Cart.",
    };

    setProducts((current) => [newProduct, ...current]);

    setSellForm({
      name: "",
      price: "",
      category: "Books",
      location: "",
      condition: "Good",
      image: "",
      description: "",
    });

    setSelectedProduct(null);
    setActivePage("Home");

    alert("Listing posted successfully!");
  }

  function openChat(product) {
    setActiveChatProduct(product);
    setSelectedProduct(null);
    setActivePage("Chat");

    setChatMessages([
      {
        sender: "Seller",
        text: `Hello! Is "${product.name}" still available?`,
      },
      {
        sender: "You",
        text: "Yes, it is available.",
      },
    ]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    setChatMessages((current) => [
      ...current,
      { sender: "You", text },
    ]);
    setChatInput("");
  }

  function deleteProduct(id) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    if (!window.confirm(`Delete "${product.name}"?`)) return;

    setProducts((current) =>
      current.filter((item) => item.id !== id)
    );
    setSaved((current) =>
      current.filter((item) => item !== id)
    );
    setSelectedProduct(null);
    setActivePage("Home");
  }


  const podcastEpisodes = [
    {
      id: 1,
      title: "UPSC Daily Current Affairs",
      category: "Current Affairs",
      duration: "12 min",
      description:
        "A quick daily roundup of important national and international issues for UPSC preparation.",
      script:
        'नमस्ते और स्वागत है UPSC डेली करेंट अफेयर्स में। आज हम UPSC की तैयारी के लिए महत्वपूर्ण राष्ट्रीय और अंतरराष्ट्रीय मुद्दों को समझेंगे। हर मुद्दे के तथ्य, कारण, प्रभाव और सरकार की प्रतिक्रिया पर ध्यान दें।',
    },
    {
      id: 2,
      title: "Indian Polity Simplified",
      category: "Polity",
      duration: "15 min",
      description:
        "Understand important Constitution and governance concepts in simple language.",
      script:
        'नमस्ते। इंडियन पॉलिटी सिंप्लिफाइड में आपका स्वागत है। आज हम संविधान, शासन व्यवस्था, मौलिक अधिकार और महत्वपूर्ण संवैधानिक संस्थाओं से जुड़े विषयों को आसान भाषा में समझेंगे।',
    },
    {
      id: 3,
      title: "Economy for Beginners",
      category: "Economy",
      duration: "10 min",
      description:
        "Learn basic economy concepts that frequently appear in UPSC preparation.",
      script:
        'इकोनॉमी फॉर बिगिनर्स में आपका स्वागत है। आज हम महंगाई, जीडीपी, राजकोषीय नीति और मौद्रिक नीति जैसे महत्वपूर्ण आर्थिक विषयों को आसान तरीके से समझेंगे और जानेंगे कि ये UPSC के लिए क्यों जरूरी हैं।',
    },
    {
      id: 4,
      title: "International Affairs",
      category: "International",
      duration: "14 min",
      description:
        "Key global developments explained with a UPSC-oriented perspective.",
      script:
        'इंटरनेशनल अफेयर्स में आपका स्वागत है। आज हम महत्वपूर्ण वैश्विक घटनाओं, भारत के दूसरे देशों के साथ संबंधों, अंतरराष्ट्रीय संगठनों और UPSC परीक्षा के लिए उनकी प्रासंगिकता को समझेंगे।',
    },
    {
      id: 5,
      title: "Modern History Revision",
      category: "History",
      duration: "13 min",
      description:
        "Revise important events, movements, and personalities from modern Indian history.",
      script:
        'मॉडर्न हिस्ट्री रिविजन में आपका स्वागत है। आज हम आधुनिक भारतीय इतिहास की महत्वपूर्ण घटनाओं, प्रमुख आंदोलनों, महत्वपूर्ण व्यक्तित्वों और उनके ऐतिहासिक महत्व को दोहराएंगे।',
    },
    {
      id: 6,
      title: "Geography Quick Revision",
      category: "Geography",
      duration: "11 min",
      description:
        "Quickly revise physical and Indian geography concepts for UPSC.",
      script:
        'जियोग्राफी क्विक रिविजन में आपका स्वागत है। आज हम भौतिक भूगोल और भारतीय भूगोल के महत्वपूर्ण विषयों जैसे जलवायु, नदियां, संसाधन और प्रमुख भौगोलिक विशेषताओं को जल्दी से दोहराएंगे।',
    },
    {
      id: 7,
      title: "Environment & Ecology",
      category: "Environment",
      duration: "12 min",
      description:
        "Understand environment and ecology topics in an easy format.",
      script:
        'एनवायरनमेंट एंड इकोलॉजी में आपका स्वागत है। आज हम जैव विविधता, पारिस्थितिकी तंत्र, संरक्षण, जलवायु परिवर्तन और प्रदूषण जैसे महत्वपूर्ण पर्यावरणीय विषयों को समझेंगे।',
    },
    {
      id: 8,
      title: "Science & Technology",
      category: "Science",
      duration: "10 min",
      description:
        "Important science and technology topics explained from a UPSC perspective.",
      script:
        'साइंस एंड टेक्नोलॉजी में आपका स्वागत है। आज हम अंतरिक्ष, जैव प्रौद्योगिकी, डिजिटल तकनीक और नई उभरती तकनीकों से जुड़े महत्वपूर्ण विषयों को UPSC के नजरिए से समझेंगे।',
    },
    {
      id: 9,
      title: "Ethics Made Simple",
      category: "Ethics",
      duration: "9 min",
      description:
        "Build a simple understanding of ethics, values, and case-study thinking.",
      script:
        'एथिक्स मेड सिंपल में आपका स्वागत है। आज हम मूल्य, ईमानदारी, जवाबदेही, भावनात्मक बुद्धिमत्ता, नैतिक दुविधाओं और UPSC केस स्टडी को हल करने के तरीके को आसान भाषा में समझेंगे।',
    },
  ];

  function togglePodcast(episode) {
    if (!("speechSynthesis" in window)) {
      alert("Audio playback is not supported in this browser.");
      return;
    }

    // If the same podcast is currently playing, pause it.
    if (playingPodcast === episode.id && !pausedPodcast) {
      window.speechSynthesis.pause();
      setPausedPodcast(true);
      return;
    }

    // If the same podcast is paused, resume it.
    if (playingPodcast === episode.id && pausedPodcast) {
      window.speechSynthesis.resume();
      setPausedPodcast(false);
      return;
    }

    // Stop any previous podcast before starting this one.
    window.speechSynthesis.cancel();
    setPlayingPodcast(null);
    setPausedPodcast(false);

    const speech = new SpeechSynthesisUtterance(episode.script);
    speech.lang = "hi-IN";
    speech.rate = 0.9;
    speech.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice =
      voices.find((voice) => voice.lang === "hi-IN") ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("hi"));

    if (hindiVoice) {
      speech.voice = hindiVoice;
    }

    speech.onend = () => {
      setPlayingPodcast(null);
      setPausedPodcast(false);
    };

    speech.onerror = () => {
      setPlayingPodcast(null);
      setPausedPodcast(false);
    };

    setPlayingPodcast(episode.id);
    setPausedPodcast(false);

    setTimeout(() => {
      window.speechSynthesis.speak(speech);
    }, 80);
  }

  function stopPodcast() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingPodcast(null);
    setPausedPodcast(false);
  }

  function renderPodcasts() {
    return (
      <section
        style={{
          padding: "45px 7% 120px",
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <div style={{ fontSize: "58px" }}>🎙️</div>
          <h1 style={{ margin: "8px 0", fontSize: "42px" }}>
            UPSC Podcasts
          </h1>
          <p style={{ color: "#777", fontSize: "18px" }}>
            Learn important UPSC topics through short audio episodes.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "22px",
          }}
        >
          {podcastEpisodes.map((episode) => {
            const isPlaying = playingPodcast === episode.id;

            return (
              <article
                key={episode.id}
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "22px",
                  padding: "22px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "18px",
                    background: "#fff0e6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    marginBottom: "18px",
                  }}
                >
                  🎧
                </div>

                <span
                  style={{
                    display: "inline-block",
                    padding: "7px 12px",
                    borderRadius: "20px",
                    background: "#f0f2ff",
                    color: "#39458a",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  {episode.category}
                </span>

                <h2 style={{ fontSize: "22px", margin: "16px 0 8px" }}>
                  {episode.title}
                </h2>

                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.6,
                    minHeight: "72px",
                  }}
                >
                  {episode.description}
                </p>

                <div
                  style={{
                    color: "#888",
                    fontSize: "14px",
                    marginBottom: "16px",
                  }}
                >
                  ⏱ {episode.duration}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => togglePodcast(episode)}
                    style={{
                      flex: 1,
                      border: "none",
                      borderRadius: "13px",
                      padding: "13px",
                      background: isPlaying ? "#222f49" : "#ff6b00",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    {isPlaying
                      ? pausedPodcast
                        ? "▶ Resume Podcast"
                        : "⏸ Pause Podcast"
                      : "▶ Play Podcast"}
                  </button>

                  {isPlaying && (
                    <button
                      onClick={stopPodcast}
                      style={{
                        width: "90px",
                        border: "1px solid #ddd",
                        borderRadius: "13px",
                        padding: "13px 8px",
                        background: "#fff",
                        color: "#555",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      ■ Stop
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }


  const roomListings = [
    {
      id: 1,
      title: "PG and Single Rooms for Rent in Old Rajinder Nagar & Patel Nagar",
      location: "Old Rajinder Nagar",
      rent: 9000,
      type: "1BHK",
      sharing: "Room Sharing",
      gender: "Boy / Girl",
      description: "PG / Single rooms available with double sharing. Suitable for UPSC aspirants.",
      amenities: ["Wi-Fi", "RO purifier", "Fridge", "AC", "Geyser"],
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000",
      time: "1 days ago",
      admin: "Admin",
    },
    {
      id: 2,
      title: "Furnished 1 Room Set in Inderpuri, New Delhi - Perfect for Girls!",
      location: "Inderpuri",
      rent: 11000,
      type: "1RK",
      sharing: "Room Sharing",
      gender: "Girl",
      description: "1 ROOM SET FURNISHED GROUND FLOOR IN 3 BHK FLAT AVAILABLE FOR RENT.",
      amenities: ["AC", "Geyser", "Attached Washroom", "Wi-Fi"],
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000",
      time: "1 days ago",
      admin: "Admin",
    },
    {
      id: 3,
      title: "Furnished 1 Room Set with Attached Washroom in Inderpuri",
      location: "Inderpuri",
      rent: 13000,
      type: "1RK",
      sharing: "Room Sharing",
      gender: "Girl",
      description: "1 ROOM SET FURNISHED GROUND FLOOR IN 3 BHK FLAT AVAILABLE FOR RENT.",
      amenities: ["AC", "Geyser", "Attached Washroom", "Fridge"],
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000",
      time: "1 days ago",
      admin: "Admin",
    },
    {
      id: 4,
      title: "Affordable PG Room near Patel Nagar Metro",
      location: "Patel Nagar",
      rent: 8000,
      type: "PG",
      sharing: "Room Sharing",
      gender: "Boy / Girl",
      description: "Clean and affordable PG room with basic facilities and easy metro access.",
      amenities: ["Wi-Fi", "Fridge", "Geyser"],
      image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1000",
      time: "2 days ago",
      admin: "Admin",
    },
    {
      id: 5,
      title: "Single Room for Rent in GTB Nagar",
      location: "GTB Nagar",
      rent: 10000,
      type: "1RK",
      sharing: "Private",
      gender: "Any",
      description: "Private room suitable for students and working professionals.",
      amenities: ["Attached Washroom", "Wi-Fi", "AC"],
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000",
      time: "3 days ago",
      admin: "Admin",
    },
  ];

  function renderRoomDetail() {
    if (!selectedRoom) return null;

    return (
      <section
        style={{
          minHeight: "calc(100vh - 80px)",
          background: "#fff",
          padding: "24px 24px 110px",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <button
            onClick={backToRooms}
            style={{
              border: "none",
              background: "transparent",
              color: "#333",
              fontSize: "18px",
              fontWeight: 700,
              padding: "8px 0 18px",
              cursor: "pointer",
            }}
          >
            ← Back to Rooms
          </button>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 4px 18px rgba(0,0,0,.07)",
              background: "#fff",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={selectedRoom.image}
                alt={selectedRoom.title}
                style={{
                  width: "100%",
                  height: "420px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <span
                style={{
                  position: "absolute",
                  top: "18px",
                  left: "18px",
                  background: "rgba(20,20,20,.78)",
                  color: "#fff",
                  padding: "9px 15px",
                  borderRadius: "20px",
                  fontWeight: 700,
                }}
              >
                Video
              </span>

              <button
                onClick={() => alert("Room saved.")}
                style={{
                  position: "absolute",
                  right: "18px",
                  top: "18px",
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#fff",
                  fontSize: "30px",
                  color: "#777",
                  cursor: "pointer",
                }}
              >
                ♡
              </button>
            </div>

            <div style={{ padding: "26px" }}>
              <h1
                style={{
                  margin: "0 0 10px",
                  fontSize: "30px",
                  lineHeight: 1.35,
                  color: "#222",
                }}
              >
                {selectedRoom.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    color: "#777",
                    fontSize: "19px",
                  }}
                >
                  📍 {selectedRoom.location}
                </span>

                <strong
                  style={{
                    color: "#e96b20",
                    fontSize: "25px",
                    whiteSpace: "nowrap",
                  }}
                >
                  ₹{selectedRoom.rent.toLocaleString()}
                  <small style={{ color: "#777", fontWeight: 400 }}>
                    /month
                  </small>
                </strong>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "22px",
                }}
              >
                <span style={roomChipStyle}>
                  🛏 {selectedRoom.type}
                </span>
                <span
                  style={{
                    ...roomChipStyle,
                    background: "#eaf9f0",
                    color: "#298c57",
                    borderColor: "#bde9cd",
                  }}
                >
                  {selectedRoom.sharing}
                </span>
                <span style={roomChipStyle}>
                  ♙ {selectedRoom.gender}
                </span>
              </div>

              <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>
                About this room
              </h3>

              <p
                style={{
                  color: "#666",
                  fontSize: "18px",
                  lineHeight: 1.6,
                  marginTop: 0,
                }}
              >
                {selectedRoom.description}
              </p>

              <h3 style={{ fontSize: "20px", marginBottom: "12px" }}>
                Amenities
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "25px",
                }}
              >
                {selectedRoom.amenities.map((item) => (
                  <span key={item} style={roomChipStyle}>
                    {item}
                  </span>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  paddingTop: "20px",
                  color: "#777",
                  fontSize: "17px",
                  marginBottom: "22px",
                }}
              >
                ♙ <strong>{selectedRoom.admin}</strong>
                <span style={{ marginLeft: "25px" }}>
                  ◷ {selectedRoom.time}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <button
                  onClick={() =>
                    alert("Room chat opened.")
                  }
                  style={{
                    padding: "16px",
                    borderRadius: "15px",
                    border: "2px solid #bde9cd",
                    background: "#eaf9f0",
                    color: "#298c57",
                    fontSize: "17px",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  💬 Chat
                </button>

                <button
                  onClick={() =>
                    alert(`Call ${selectedRoom.admin} about this room.`)
                  }
                  style={{
                    padding: "16px",
                    borderRadius: "15px",
                    border: "2px solid #e87532",
                    background: "#fff",
                    color: "#e87532",
                    fontSize: "17px",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  ☎ Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function renderRooms() {
    const filteredRooms = roomListings
      .filter((room) => {
        const query = roomSearch.trim().toLowerCase();

        const matchesSearch =
          !query ||
          room.title.toLowerCase().includes(query) ||
          room.location.toLowerCase().includes(query);

        const matchesArea =
          roomArea === "All Areas" || room.location === roomArea;

        const matchesType =
          roomType === "All Types" || room.type === roomType;

        const matchesGender =
          roomGender === "Any" ||
          room.gender === roomGender ||
          room.gender === "Boy / Girl";

        const matchesRent =
          !maxRent || room.rent <= Number(maxRent);

        return (
          matchesSearch &&
          matchesArea &&
          matchesType &&
          matchesGender &&
          matchesRent
        );
      })
      .sort((a, b) => {
        if (roomSort === "Rent Low to High") return a.rent - b.rent;
        if (roomSort === "Rent High to Low") return b.rent - a.rent;
        return a.id - b.id;
      });

    return (
      <section
        style={{
          background: "#fff",
          minHeight: "calc(100vh - 80px)",
          paddingBottom: "120px",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#fffaf7",
            padding: "22px 24px 18px",
            borderBottom: "1px solid #eee",
          }}
        >
          <div
            style={{
              maxWidth: "850px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                margin: "0 0 24px",
                fontSize: "30px",
                color: "#111",
              }}
            >
              Rent Rooms
            </h1>

            <button
              onClick={() => setActivePage("Sell")}
              style={{
                position: "absolute",
                right: 0,
                top: -4,
                width: "60px",
                height: "60px",
                border: "none",
                borderRadius: "50%",
                background: "#ff6b00",
                color: "#fff",
                fontSize: "34px",
                cursor: "pointer",
              }}
            >
              +
            </button>

            <div
              style={{
                background: "#fff",
                border: "2px solid #eee",
                borderRadius: "22px",
                padding: "20px",
              }}
            >
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "18px",
                    top: "13px",
                    fontSize: "28px",
                    color: "#aaa",
                  }}
                >
                  ⌕
                </span>

                <input
                  value={roomSearch}
                  onChange={(e) => setRoomSearch(e.target.value)}
                  placeholder="Search by location, title..."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "17px 20px 17px 58px",
                    border: "2px solid #ddd",
                    borderRadius: "15px",
                    fontSize: "18px",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.25fr",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                <select
                  value={roomSort}
                  onChange={(e) => setRoomSort(e.target.value)}
                  style={roomSelectStyle}
                >
                  <option>Newest First</option>
                  <option>Rent Low to High</option>
                  <option>Rent High to Low</option>
                </select>

                <button
                  onClick={() =>
                    alert("Free room leads will appear here.")
                  }
                  style={{
                    ...roomSelectStyle,
                    background: "#70c95a",
                    color: "#fff",
                    fontWeight: 800,
                    border: "2px dashed #dfff7d",
                    cursor: "pointer",
                  }}
                >
                  Tap For Free Room Leads
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginTop: "12px",
                }}
              >
                <select
                  value={roomArea}
                  onChange={(e) => setRoomArea(e.target.value)}
                  style={roomSelectStyle}
                >
                  <option>All Areas</option>
                  <option>Old Rajinder Nagar</option>
                  <option>Patel Nagar</option>
                  <option>Inderpuri</option>
                  <option>GTB Nagar</option>
                </select>

                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  style={roomSelectStyle}
                >
                  <option>All Types</option>
                  <option>1BHK</option>
                  <option>1RK</option>
                  <option>PG</option>
                </select>

                <input
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                  type="number"
                  placeholder="Max Rent"
                  style={roomSelectStyle}
                />

                <select
                  value={roomGender}
                  onChange={(e) => setRoomGender(e.target.value)}
                  style={roomSelectStyle}
                >
                  <option>Any</option>
                  <option>Boy</option>
                  <option>Girl</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            padding: "28px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "22px" }}>
              Rooms: {filteredRooms.length}
            </h2>

            <button
              onClick={() => {
                setRoomSearch("");
                setRoomSort("Newest First");
                setRoomArea("All Areas");
                setRoomType("All Types");
                setRoomGender("Any");
                setMaxRent("");
              }}
              style={{
                border: "none",
                background: "transparent",
                color: "#e96b21",
                fontSize: "30px",
                cursor: "pointer",
              }}
            >
              ↻
            </button>
          </div>

          {filteredRooms.map((room) => (
            <article
              key={room.id}
              onClick={() => openRoom(room)}
              style={{
                background: "#fff",
                cursor: "pointer",
                border: "1px solid #eee",
                borderRadius: "28px",
                overflow: "hidden",
                marginBottom: "22px",
                boxShadow: "0 3px 14px rgba(0,0,0,.06)",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={room.image}
                  alt={room.title}
                  style={{
                    width: "100%",
                    height: "330px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "rgba(20,20,20,.75)",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "8px 14px",
                    fontWeight: 700,
                  }}
                >
                  Video
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Room saved.");
                  }}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "16px",
                    width: "58px",
                    height: "58px",
                    borderRadius: "50%",
                    border: "none",
                    background: "#fff",
                    fontSize: "30px",
                    color: "#777",
                    cursor: "pointer",
                  }}
                >
                  ♡
                </button>

                <span
                  style={{
                    position: "absolute",
                    right: "16px",
                    bottom: "16px",
                    background: "rgba(20,20,20,.75)",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "8px 13px",
                  }}
                >
                  1/2
                </span>
              </div>

              <div style={{ padding: "22px 26px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      lineHeight: 1.45,
                      color: "#222",
                    }}
                  >
                    {room.title}
                  </h2>

                  <strong
                    style={{
                      color: "#e86b20",
                      fontSize: "21px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ₹{room.rent.toLocaleString()}
                    <small style={{ color: "#777", fontWeight: 400 }}>
                      /month
                    </small>
                  </strong>
                </div>

                <p
                  style={{
                    margin: "8px 0 16px",
                    color: "#777",
                    fontSize: "19px",
                  }}
                >
                  ◉ &nbsp; {room.location}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "18px",
                  }}
                >
                  <span style={roomChipStyle}>🛏 {room.type}</span>
                  <span
                    style={{
                      ...roomChipStyle,
                      background: "#eaf9f0",
                      color: "#298c57",
                      borderColor: "#bde9cd",
                    }}
                  >
                    {room.sharing}
                  </span>
                  <span style={roomChipStyle}>♙ {room.gender}</span>
                </div>

                <p
                  style={{
                    color: "#777",
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {room.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "22px",
                  }}
                >
                  {room.amenities.slice(0, 3).map((item) => (
                    <span key={item} style={roomChipStyle}>
                      '{item}'
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span style={roomChipStyle}>
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div
                  style={{
                    borderTop: "1px solid #eee",
                    paddingTop: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#777",
                      flex: 1,
                    }}
                  >
                    ♙ &nbsp; {room.admin}
                  </span>

                  <span style={{ color: "#999" }}>
                    ◷ &nbsp; {room.time}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Room chat opened.");
                    }}
                    style={roomActionStyle}
                  >
                    ▢
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Call ${room.admin} about this room.`);
                    }}
                    style={{
                      ...roomCallStyle,
                      display: room.id === 3 ? "block" : "none",
                    }}
                  >
                    ☎ Call
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filteredRooms.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#777",
              }}
            >
              <h2>No rooms found</h2>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <div
          style={{
            position: "fixed",
            right: "24px",
            bottom: "85px",
            width: "62px",
            height: "62px",
            borderRadius: "50%",
            background: "#ff6b00",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            boxShadow: "0 5px 15px rgba(0,0,0,.18)",
            zIndex: 30,
          }}
        >
          🎧
        </div>

        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: "0",
            height: "68px",
            background: "#fff",
            borderTop: "1px solid #eee",
            zIndex: 25,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
          }}
        >
          <span style={{ fontSize: "15px" }}>
            🎙️ &nbsp; स्वतंत्रता और विकसित भारत का रोडमैप
          </span>
          <button
            onClick={() => alert("Podcast player")}
            style={{
              marginLeft: "22px",
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              border: "none",
              background: "#ff6b00",
              color: "#fff",
              fontSize: "20px",
            }}
          >
            ▶
          </button>
          <span style={{ marginLeft: "18px" }}>1.00x</span>
        </div>
      </section>
    );
  }


  const authInputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 15px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    marginBottom: "13px",
    fontSize: "16px",
    outline: "none",
  };

  async function submitAuth(e) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const endpoint = authMode === "login" ? "/api/login" : "/api/register";
      const payload =
        authMode === "login"
          ? { email: authEmail, password: authPassword }
          : { name: authName, email: authEmail, password: authPassword };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      localStorage.setItem("upsc_logged_in", "true");
      localStorage.setItem("upsc_user", data.user.name);
      setLoggedUser(data.user.name);
      setIsLoggedIn(true);
      setAuthPassword("");
      setActivePage("Home");
    } catch (error) {
      setAuthError(
        error.message ||
          "Backend se connection nahi ho pa raha. Check karo server running hai."
      );
    } finally {
      setAuthLoading(false);
    }
  }

  function logoutUser() {
    localStorage.removeItem("upsc_logged_in");
    localStorage.removeItem("upsc_user");
    setIsLoggedIn(false);
    setLoggedUser("");
    setAuthEmail("");
    setAuthPassword("");
    setAuthMode("login");
    setActivePage("Home");
  }

  function renderLogin() {
    return (
      <section
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#fff7f0,#fff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "min(430px,100%)",
            background: "#fff",
            borderRadius: "26px",
            padding: "34px",
            boxShadow: "0 15px 45px rgba(0,0,0,.10)",
            border: "1px solid #eee",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "26px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                background: "#ff6b00",
                color: "#fff",
                fontWeight: 900,
                fontSize: "18px",
                lineHeight: 1.05,
              }}
            >
              UPSC<br />CART
            </div>

            <h1 style={{ margin: "20px 0 6px", fontSize: "30px" }}>
              {authMode === "login" ? "Welcome Back" : "Create Account"}
            </h1>

            <p style={{ color: "#777", margin: 0 }}>
              {authMode === "login"
                ? "Login to continue to UPSC Cart"
                : "Create your UPSC Cart account"}
            </p>
          </div>

          <form onSubmit={submitAuth}>
            {authMode === "register" && (
              <input
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                placeholder="Full Name"
                required
                style={authInputStyle}
              />
            )}

            <input
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              style={authInputStyle}
            />

            <input
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="Password (minimum 6 characters)"
              type="password"
              minLength={6}
              required
              style={authInputStyle}
            />

            {authError && (
              <div
                style={{
                  background: "#fff0f0",
                  color: "#c74444",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  marginBottom: "14px",
                  fontSize: "14px",
                }}
              >
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "13px",
                padding: "15px",
                background: "#ff6b00",
                color: "#fff",
                fontSize: "17px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {authLoading
                ? "Please wait..."
                : authMode === "login"
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <button
            onClick={() => {
              setAuthMode(authMode === "login" ? "register" : "login");
              setAuthError("");
            }}
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "12px",
              border: "none",
              background: "transparent",
              color: "#ff6b00",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {authMode === "login"
              ? "New here? Create an account"
              : "Already have an account? Login"}
          </button>
        </div>
      </section>
    );
  }

  function renderHome() {
    return (
      <>
        <section className="verify-banner">
          <div>
            <h3>🛡 Verify your account</h3>
            <p>
              Get verified to build trust and increase response rates.
            </p>
          </div>

          <button>Verify</button>
        </section>

        <section className="hero">
          <h1>Buy & Sell UPSC Essentials</h1>

          <p>
            Books • Furniture • Electronics • Accessories
            <br />
            Zero Commission • Direct Chat
          </p>
        </section>

        <section className="stats">
          <div className="stat-card orange-stat">
            <span className="stat-icon">♡</span>

            <div>
              <strong>{products.length}</strong>
              <span>Listings</span>
            </div>
          </div>

          <div className="stat-card blue-stat">
            <span className="stat-icon">👥</span>

            <div>
              <strong>1,600+</strong>
              <span>Aspirants</span>
            </div>
          </div>
        </section>

        <section className="search-area">
          <div className="search-box">
            <span>⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books, notes, test series..."
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
          >
            <option>Recent</option>
            <option>Low → High</option>
            <option>High → Low</option>
          </select>
        </section>

        <section className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "category active"
                  : "category"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </section>

        <section className="result-header">
          <h2>{filteredProducts.length} Results Found</h2>
        </section>

        <section className="products">
          {filteredProducts.length === 0 ? (
            <div className="empty">
              <div>🔎</div>
              <h3>No products found</h3>
              <p>Try another search or category.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
                onClick={() => openProduct(product)}
              >
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span className="condition">
                    {product.condition}
                  </span>

                  <button
                    className={
                      saved.includes(product.id)
                        ? "heart saved"
                        : "heart"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaved(product.id);
                    }}
                  >
                    {saved.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>

                  <strong className="price">
                    ₹{product.price.toLocaleString()}
                  </strong>

                  <div className="location">
                    📍 {product.location}
                  </div>

                  <span className="product-category">
                    {product.category}
                  </span>
                </div>
              </article>
            ))
          )}
        </section>
      </>
    );
  }

  function renderSaved() {
    const savedProducts = products.filter((item) =>
      saved.includes(item.id)
    );

    return (
      <section className="page-section">
        <div className="page-title">
          <span>♡</span>
          <h1>Saved Items</h1>
          <p>Your favourite products appear here.</p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="empty">
            <div>♡</div>
            <h3>No saved items yet</h3>
            <p>Tap the heart on a product to save it.</p>
          </div>
        ) : (
          <div className="products">
            {savedProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
                onClick={() => openProduct(product)}
              >
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>

                  <strong className="price">
                    ₹{product.price.toLocaleString()}
                  </strong>

                  <div className="location">
                    📍 {product.location}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  function renderSell() {
    return (
      <section className="sell-page">
        <div className="sell-heading">
          <div className="sell-plus">+</div>

          <h1>Sell on UPSC Cart</h1>

          <p>
            Create a listing and connect with UPSC aspirants.
          </p>
        </div>

        <form
          className="sell-form"
          onSubmit={handlePostListing}
        >
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>

              <input
                name="name"
                value={sellForm.name}
                onChange={handleSellChange}
                placeholder="e.g. UPSC Books Set"
              />
            </div>

            <div className="form-group">
              <label>Price</label>

              <input
                name="price"
                type="number"
                min="1"
                value={sellForm.price}
                onChange={handleSellChange}
                placeholder="e.g. 800"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={sellForm.category}
                onChange={handleSellChange}
              >
                <option>Books</option>
                <option>Furniture</option>
                <option>Appliances</option>
                <option>Electronics</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                name="location"
                value={sellForm.location}
                onChange={handleSellChange}
                placeholder="e.g. Old Rajinder Nagar"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Condition</label>

              <select
                name="condition"
                value={sellForm.condition}
                onChange={handleSellChange}
              >
                <option>Good</option>
                <option>Like New</option>
                <option>Fair</option>
                <option>New</option>
              </select>
            </div>

            <div className="form-group">
              <label>Image URL</label>

              <input
                name="image"
                value={sellForm.image}
                onChange={handleSellChange}
                placeholder="Paste image URL (optional)"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description</label>

            <textarea
              name="description"
              value={sellForm.description}
              onChange={handleSellChange}
              placeholder="Describe your item..."
              rows="5"
            />
          </div>

          <div className="sell-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={goHome}
            >
              ← Cancel
            </button>

            <button
              type="submit"
              className="post-button"
            >
              Post Listing
            </button>
          </div>
        </form>
      </section>
    );
  }



  const roomSelectStyle = {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "58px",
    padding: "12px 16px",
    border: "2px solid #ddd",
    borderRadius: "15px",
    background: "#fff",
    color: "#444",
    fontSize: "17px",
    outline: "none",
  };

  const roomChipStyle = {
    padding: "10px 17px",
    borderRadius: "25px",
    border: "2px solid #e5e5e5",
    background: "#fff",
    color: "#333",
    fontSize: "16px",
    fontWeight: 700,
  };

  const roomActionStyle = {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    border: "1px solid #bde9cd",
    background: "#eaf9f0",
    color: "#298c57",
    fontSize: "27px",
    cursor: "pointer",
  };

  const roomCallStyle = {
    padding: "13px 20px",
    borderRadius: "28px",
    border: "2px solid #e87532",
    background: "#fff",
    color: "#e87532",
    fontSize: "17px",
    fontWeight: 800,
    cursor: "pointer",
  };

  const profileRowStyle = {
    width: "100%",
    minHeight: "100px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    padding: "18px 34px",
    border: "none",
    borderBottom: "1px solid #ddd",
    background: "#fff",
    textAlign: "left",
    cursor: "pointer",
  };

  const profileIconStyle = {
    width: "48px",
    minWidth: "48px",
    fontSize: "34px",
    color: "#777",
    textAlign: "center",
  };

  const profileTextStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const arrowStyle = {
    color: "#999",
    fontSize: "38px",
    lineHeight: 1,
  };


  function renderProfile() {
    const profileRows = [
      {
        icon: "♡",
        title: "Saved Items",
        action: () => setActivePage("Saved"),
      },
      {
        icon: "▣",
        title: "My Listings",
        action: () => setActivePage("Home"),
      },
      {
        icon: "⚒",
        title: "Auction Dashboard",
        subtitle: "Manage your auctions",
        action: () => alert("Auction Dashboard will be available here."),
        arrow: "⌄",
      },
      {
        icon: "ⓘ",
        title: "Auction Permissions",
        subtitle: "Full auction access",
        green: true,
        action: () => alert("You have full auction access."),
      },
      {
        icon: "⚑",
        title: "My Reports",
        action: () => alert("Your reports will appear here."),
      },
      {
        icon: "♙",
        title: "Privacy",
        action: () => alert("Privacy settings will appear here."),
      },
      {
        icon: "⇧",
        title: "Room Leads Web",
        action: () => setActivePage("Rooms"),
      },
      {
        icon: "?",
        title: "Get Help",
        action: () => alert("How can we help you?"),
      },
    ];

    return (
      <section
        style={{
          minHeight: "calc(100vh - 90px)",
          background: "#fff",
          paddingBottom: "110px",
        }}
      >
        <div
          style={{
            padding: "28px 32px",
            background: "#fff",
            borderBottom: "1px solid #f3f3f3",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: 800,
              color: "#222",
            }}
          >
            Profile
          </h1>
        </div>

        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              padding: "45px 32px",
              background: "#fff",
            }}
          >
            <div
              style={{
                width: "132px",
                height: "132px",
                minWidth: "132px",
                borderRadius: "50%",
                background: "#ff7200",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "64px",
                fontWeight: 400,
              }}
            >
              👤
            </div>

            <div>
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "30px",
                  color: "#222",
                }}
              >
                {loggedUser || "Username"} <span style={{ color: "#ff6b00" }}>✹</span>
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: "20px",
                  color: "#777",
                }}
              >
                user@example.com
              </p>
            </div>
          </div>

          <div
            style={{
              borderTop: "12px solid #fafafa",
            }}
          >
            <button
              onClick={() =>
                alert("Mobile number is verified.")
              }
              style={profileRowStyle}
            >
              <span style={profileIconStyle}>▣</span>
              <span style={profileTextStyle}>
                <strong>Mobile Verification</strong>
                <small>XXX5350 • Verified</small>
              </span>
              <span style={{ color: "#ff6b00", fontSize: "28px" }}>
                ✹
              </span>
              <span style={arrowStyle}>›</span>
            </button>

            {profileRows.map((row) => (
              <button
                key={row.title}
                onClick={row.action}
                style={{
                  ...profileRowStyle,
                  ...(row.green
                    ? { color: "#59ad63" }
                    : {}),
                }}
              >
                <span
                  style={{
                    ...profileIconStyle,
                    color: row.green ? "#59ad63" : "#777",
                  }}
                >
                  {row.icon}
                </span>

                <span style={profileTextStyle}>
                  <strong
                    style={{
                      color: row.green ? "#59ad63" : "#222",
                    }}
                  >
                    {row.title}
                  </strong>

                  {row.subtitle && (
                    <small>{row.subtitle}</small>
                  )}
                </span>

                <span style={arrowStyle}>
                  {row.arrow || "›"}
                </span>
              </button>
            ))}
          </div>

          <div
            style={{
              background: "#fafafa",
              padding: "28px 28px 38px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: "0 0 22px",
                color: "#666",
                fontSize: "20px",
              }}
            >
              Follow UPSC Cart
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              {[
                ["🟢", "WhatsApp"],
                ["🔵", "Telegram"],
                ["🩷", "Instagram"],
                ["🔵", "Facebook"],
              ].map(([icon, name]) => (
                <button
                  key={name}
                  onClick={() =>
                    alert(`${name} link will open here.`)
                  }
                  style={{
                    minWidth: "190px",
                    padding: "14px 22px",
                    borderRadius: "32px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#333",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                    {icon}
                  </span>
                  {name}
                </button>
              ))}
            </div>

            <p
              style={{
                margin: "42px 0 30px",
                color: "#aaa",
                fontSize: "17px",
              }}
            >
              Version 1.0.80
            </p>

            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  logoutUser();
                }
              }}
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "24px",
                border: "2px solid #e45b5b",
                background: "#fff",
                color: "#df4f4f",
                fontSize: "20px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              ⇥ &nbsp; Logout
            </button>
          </div>
        </div>
      </section>
    );
  }

  function renderSimplePage(title, icon, text) {
    return (
      <section className="simple-page">
        <div className="simple-icon">{icon}</div>

        <h1>{title}</h1>

        <p>{text}</p>

        <button onClick={goHome}>
          Back to Home
        </button>
      </section>
    );
  }

  function renderProductDetail() {
    return (
      <section className="detail-page">
        <button
          className="back-button"
          onClick={goHome}
        >
          ← Back
        </button>

        <div className="detail-card">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
          />

          <div className="detail-content">
            <span className="condition">
              {selectedProduct.condition}
            </span>

            <h1>{selectedProduct.name}</h1>

            <div className="detail-price">
              ₹{selectedProduct.price.toLocaleString()}
            </div>

            <p className="detail-location">
              📍 {selectedProduct.location}
            </p>

            <span className="product-category">
              {selectedProduct.category}
            </span>

            <p className="description">
              {selectedProduct.description}
            </p>

            <div className="detail-actions">
              <button
                className="save-button"
                onClick={() =>
                  toggleSaved(selectedProduct.id)
                }
              >
                {saved.includes(selectedProduct.id)
                  ? "♥ Saved"
                  : "♡ Save"}
              </button>

              <button
                className="chat-button"
                onClick={() => openChat(selectedProduct)}
              >
                💬 Chat with Seller
              </button>

              <button
                className="delete-button"
                onClick={() => deleteProduct(selectedProduct.id)}
              >
                🗑 Delete Product
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function renderCurrentPage() {
    if (selectedRoom) {
      return renderRoomDetail();
    }

    if (selectedProduct) {
      return renderProductDetail();
    }

    if (activePage === "Home") {
      return renderHome();
    }

    if (activePage === "Rooms") {
      return renderRooms();
    }

    if (activePage === "Saved") {
      return renderSaved();
    }

    if (activePage === "Sell") {
      return renderSell();
    }

    if (activePage === "Chat") {
      return (
        <section className="simple-page">
          <div className="simple-icon">💬</div>
          <h1>Messages</h1>

          {activeChatProduct ? (
            <>
              <p>
                Chat with seller about{" "}
                <strong>{activeChatProduct.name}</strong>
              </p>

              <div
                style={{
                  width: "min(720px, 90%)",
                  margin: "20px auto",
                  padding: "20px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "20px",
                  background: "#fff",
                  textAlign: "left",
                }}
              >
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "12px",
                      padding: "14px 16px",
                      borderRadius: "14px",
                      background:
                        message.sender === "You"
                          ? "#f1f1f1"
                          : "#fff1e8",
                      textAlign:
                        message.sender === "You" ? "right" : "left",
                    }}
                  >
                    <strong>{message.sender}</strong>
                    <div>{message.text}</div>
                  </div>
                ))}

                <form
                  onSubmit={sendMessage}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "18px",
                  }}
                >
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                      flex: 1,
                      padding: "14px",
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      fontSize: "16px",
                    }}
                  />

                  <button
                    type="submit"
                    style={{
                      padding: "14px 22px",
                      border: "none",
                      borderRadius: "12px",
                      background: "#ff6b00",
                      color: "#fff",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Send
                  </button>
                </form>
              </div>

              <button onClick={goHome}>Back to Home</button>
            </>
          ) : (
            <>
              <p>Your conversations with sellers will appear here.</p>
              <button onClick={goHome}>Back to Home</button>
            </>
          )}
        </section>
      );
    }

    if (activePage === "Podcasts") {
      return renderPodcasts();
    }

    if (activePage === "Profile") {
      return renderProfile();
    }
  }

  if (!isLoggedIn) {
    return renderLogin();
  }

  return (
    <div className="app">
      {activePage === "Home" && !selectedProduct && (
        <header className="top-header">
          <button
            className="logo"
            onClick={goHome}
          >
            UPSC
            <br />
            CART
          </button>

          <button
            className="area-button"
            onClick={() =>
              setShowAreas(!showAreas)
            }
          >
            📍 {selectedArea} ▾
          </button>

          <div className="header-actions">
            <button
              className="plus-button"
              onClick={() => {
                setSelectedProduct(null);
                setActivePage("Sell");
              }}
            >
              +
            </button>

            <button
              className="profile-circle"
              onClick={() => {
                setSelectedProduct(null);
                setActivePage("Profile");
              }}
            >
              D
            </button>
          </div>

          {showAreas && (
            <div className="area-menu">
              {[
                "All Areas",
                "Old Rajinder Nagar",
                "Mukherjee Nagar",
                "Karol Bagh",
                "GTB Nagar",
                "Patel Nagar",
                "Laxmi Nagar",
              ].map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    setSelectedArea(area);
                    setShowAreas(false);
                  }}
                >
                  {area}
                </button>
              ))}
            </div>
          )}
        </header>
      )}

      <main>{renderCurrentPage()}</main>

      <button className="auction-button">
        ⚒ Live Auctions
      </button>

      <button className="support-button">
        🎧
      </button>

      <nav className="bottom-nav">
        {[
          ["Home", "⌂"],
          ["Rooms", "🚪"],
          ["Saved", "♡"],
          ["Chat", "▢"],
          ["Podcasts", "◉"],
          ["Profile", "♙"],
        ].map(([name, icon]) => (
          <button
            key={name}
            className={
              activePage === name
                ? "nav-active"
                : ""
            }
            onClick={() => {
              setSelectedProduct(null);
              setActivePage(name);
            }}
          >
            <span>{icon}</span>
            <small>{name}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
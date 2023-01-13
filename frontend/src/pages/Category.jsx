import React from "react";


const Category = () => {
  // const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState({
  //   id: "",
  //   categoryName: "",
  //   desc: "",
  //   image: "",
  // });

  // // show get model
  // const [showModal, setShowModal] = useState(false);

  // // show update model
  // const [showUpdateModel, setShowUpdateModel] = useState(false);

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let formData = new FormData();
  //     formData.append("categoryName", category.categoryName);
  //     formData.append("desc", category.desc);
  //     formData.append("image", category.image);

  //     const res = await axios.post(
  //       "http://localhost:3001/categories",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleChange = (e) => {
  //   setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const fetchCategories = async () => {
  //   const res = await axios.get("http://localhost:3001/categories");
  //   // console.log(res);
  //   setCategories(res.data);
  // };

  // // update category function
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let formData = new FormData();
  //     formData.append("categoryName", category.categoryName);
  //     formData.append("desc", category.desc);
  //     formData.append("image", category.image);

  //     const res = await axios.put(
  //       `http://localhost:3001/categories/${category.id}`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     //console.log(res)
  //     if (res.status === 201) {
  //       fetchCategories();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, [categories]);

  // // Delete
  // const handleDelete = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to delete...!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         axios.delete(`http://localhost:3001/categories/` + id);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: "top-end",
  //         showConfirmButton: false,
  //         timer: 5000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.addEventListener("mouseenter", Swal);
  //           toast.addEventListener("mouseleave", Swal);
  //         },
  //       });
  //       Toast.fire({
  //         icon: "success",
  //         title: "Book has been deleted successfully.",
  //       });
  //       fetchCategories();
  //     }
  //   });
  // };

  return (
    <>
      <>Hell0</>
    </>
  );
};

export default Category;

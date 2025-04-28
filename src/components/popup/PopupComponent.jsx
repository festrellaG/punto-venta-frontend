import closePopup from "../../assets/close_icon.png";

const PopupComponent = (props) => {
  return (
    <div
      className={`fixed inset-0 w-full h-full bg-black bg-opacity-50 cursor-pointer ${
        props.isOpen ? "block" : "hidden"
      }`}
    >
      <form
        className="fixed w-[370px] p-9 bg-white border border-black shadow-md z-[1000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg flex flex-col box-border cursor-default"
        onSubmit={props.onSubmit}
        name={props.name}
      >
        <img
          src={closePopup}
          className="absolute -top-8 -right-8 cursor-pointer"
          alt="icono en tache para cerrar form"
          onClick={props.onClose}
        />
        <div className="flex justify-center">
          <img src={props.icon} alt="desc" className="w-[90px] h-[90px] mb-4" />
        </div>
        <p className="text-lg text-black text-left m-0">{props.title}</p>
      </form>
    </div>
  );
};

export default PopupComponent;

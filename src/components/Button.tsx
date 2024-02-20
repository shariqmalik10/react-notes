interface BtnProps {
    name: "Next"|"Previous";
    onClick: () => void;
}

export default function Button({ name, onClick }: BtnProps) {
    return <button className="button" style={{ width: "18rem" }}onClick={onClick}>
        {name}
    </button>
}






















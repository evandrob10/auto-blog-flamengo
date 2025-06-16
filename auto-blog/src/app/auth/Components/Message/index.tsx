export default function Message({ msg }: { msg: string | undefined }) {
  return (
    <>
      {msg && (
        <div className="mb-2">
          <p className={msg.includes("sucess") ? "text-[green]" : "text-[red]"}>
            {msg}
          </p>
        </div>
      )}
    </>
  );
}

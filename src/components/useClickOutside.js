
export default function useClickOutside (ref, callback)  {
    document.addEventListener("click", (e) => {
        if (ref.current == null || ref.current.contains(e.target)) return null
        return callback(e)
    });
}

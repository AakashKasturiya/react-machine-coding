export const Footer = ({error}) =>{
    return(
        <>
          <div className="mt-6 text-sm text-slate-500">
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </>
    )
}
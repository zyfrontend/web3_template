async function getTronWeb() {
  let tronWeb
  if (window.tronWeb.ready) {
    tronWeb = window.tronWeb
  } else {
    const res = await window.tronWeb.request({ method: 'tron_requestAccounts' })
    if (res.code === 200) {
      tronWeb = window.tronWeb
    }
  }

  return tronWeb
}
export { getTronWeb }

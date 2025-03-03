const Loadings = () => {
    return <div id="div_gotopayment" bis_skin_checked="1">
        <div style={{ padding: "7px", width: "125px", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "10007", background: "#fff", textAlign: "center", borderRadius: "10px" }} bis_skin_checked="1">
            <img src="/assets/images/loading.gif" style={{ width: "80px" }} alt="" />
            <span id="loadermsg" style={{ fontSize: "12px", color: "rgb(255, 127, 0)", display: "none" }}></span>
        </div>
        <div class="midum-overlay" id="fadebackground" bis_skin_checked="1"></div>
    </div>
}


export default Loadings;
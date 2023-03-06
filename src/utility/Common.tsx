class Common {
    numberFormat = Intl.NumberFormat();

    formatNumber = (info : number) => {
        return this.numberFormat.format(info);
    }


}

export default new Common();
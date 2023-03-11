class Common {
    numberFormat = Intl.NumberFormat();

    formatNumber = (info : number) => {
        return this.numberFormat.format(info);
    }

    handleDate = (date) => {
        if (date) {
          const toString = new Date(date).toLocaleDateString();
          return String(toString);
        } else return '----';
      };

}

export default new Common();
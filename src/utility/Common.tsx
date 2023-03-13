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

export const altImage = 'https://firebasestorage.googleapis.com/v0/b/web-elear.appspot.com/o/files%2F123.PNG?alt=media&token=0b60b627-a262-4048-a8bc-fcc4223d5156';

export default new Common();
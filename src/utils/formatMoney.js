const formatMoney = (a) => {
        if(a === null || a === undefined) return 0;
        if(typeof(a) != 'number') return a;
        a = a.toString();
        let deci;
        if(a.search('.') !== -1){
          deci = a.split('.')[1]
          a = a.split('.')[0];
        }

        if(a.length > 3){
            var i = 0, b = [];
            a = a.split('').reverse().join('');
            while(i < a.length){
                b.push(a.slice(i,i+3).split('').reverse().join(''));
                i += 3;
            }
            if(deci) return b.reverse().join(',') + `.${deci.slice(0,2)}`;
            return b.reverse().join(',');
          }
          
        if(deci) return a + `.${deci.slice(0,2)}`;
        return a
}

export default formatMoney;
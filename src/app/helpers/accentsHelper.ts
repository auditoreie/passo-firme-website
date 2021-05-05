const accentsIn = 'ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ'
const accentsOut = 'AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg'
const accentsMap = new Map();

accentsIn.split('').forEach((accent, index) => accentsMap.set(
  accentsIn.charCodeAt(index), accentsOut.charCodeAt(index))
)

export function removeAccents(str) {
  const newString = new Array(str.length);
  let x
  for (let i = 0; i < newString.length; i++) {
    newString[i] = accentsMap.get(x = str.charCodeAt(i)) || x
  }
  return String.fromCharCode.apply(null, newString);
}

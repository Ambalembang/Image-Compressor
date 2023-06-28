const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];                                         // Mengambil data file yang di upload
    if(!file) return;                                                       // Return jika tidak mengupload file
    previewImg.src = URL.createObjectURL(file);                             // Menampilkan gambar yang sudah di pilih
    previewImg.addEventListener("load", () => {                             // Ketika gambar sudah berhasil di masukan
        widthInput.value = previewImg.naturalWidth;                         // Menampilkan width ( Lebar ) 
        heightInput.value = previewImg.naturalHeight;                       // Menampilkan height ( Tinggi )
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active"); // Class active ditambahkan ke class wrapper
    });
}

widthInput.addEventListener("keyup", () => {// Jika ratioInput di check, maka ratio dari height akan berubah mengikuti width
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value; 
    heightInput.value = Math.floor(height); // Math.flooer digunakan untuk membulatkan bilangan float
});

heightInput.addEventListener("keyup", () => {// Jika ratioInput di check, maka ratio dari width akan berubah mengikuti height
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width); // Math.flooer digunakan untuk membulatkan bilangan float
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");   // membuat element anchor
    const ctx = canvas.getContext("2d");     // getContext digunakan untuk membuka canvas menjadi 2d

    
    // Jika qualityInput (Reduce Quality) di check, maka resolusi gambar akan diatur menjadi 50%, jika tidak akan tetap 100%
    const imgQuality = qualityInput.checked ? 0.5 : 1.0;

    // mengatur width dan height canvas sesuai dengan input yang dimasukan
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // drawImage digunakan untuk mencetak gambar 
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    
    
    a.href = canvas.toDataURL("image/jpeg", imgQuality);// memasukan data dari canvas ke anchor
    a.download = new Date().getTime();                  // memasukan waktu sekarang sebagai value
    a.click();                                          // menekan anchor sehingga file bisa di download
}   

downloadBtn.addEventListener("click", resizeAndDownload);       // Mengatur download-btn agar ketika ditekan akan memanggil resizeAndDownload
fileInput.addEventListener("change", loadFile);                 // Mengambil file yang di input
uploadBox.addEventListener("click", () => fileInput.click());   // Agar fileinput dapat diakses dengan menekan upload-box
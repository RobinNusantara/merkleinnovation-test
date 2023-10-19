# merkleinnovation-test

**Guest Form**<br/>
API ini digunakan agar tamu dapat menambahkan data dirinya ke daftar
tamu. Data diri yang diisikan adalah nama, alamat, nomor telepon, dan
catatan (free text)

Answer:

Untuk API guest form saya tidak menambahkan authentication dikarenakan saat tamu ingin menambahkan data dirinya ke daftar tamu saya menurut saya tidak perlu melakukan login terlebih dahulu.

Method: `POST`</br>
Uri: `/v1/guest-forms`</br>
Body: 
```json
{
    "name": "John Doe",
    "phoneNumber": "085536519206",
    "address": "Jl Dewi Sartika Gg 3 Blok P No 14",
    "notes": ""
}
```
<img width="1232" alt="Screenshot 2023-10-19 at 23 59 00" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/8de8f2c4-33fa-4719-9773-6907c44c7fea">
<img width="1232" alt="Screenshot 2023-10-19 at 23 58 32" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/2abfb0d0-8bfe-4fde-a698-0d312271da6d">

**Note Gallery**<br/>
API ini digunakan untuk menampilkan semua catatan yang sudah tersimpan di
database. Data yang ditampilkan hanya nama dan catatan. Sehingga, Anda
harus menghilangkan alamat dan nomor telepon pada response API ini.

Answer:

Untuk API note gallery saya tidak menambahkan authentication dikarenakan saya beramsumsi untuk data note gallery adalah data bisa diakses secara public, oleh karena itu data yang ditampilkan hanya nama tamu dan notes yang telah dituliskan oleh tamu pada API guest form. Saya juga menambahkan pagination 
dikarenakan daftar tamu di masa yang akan mendatang pasti akan semakin bertambah banyak, oleh karena itu saya menambahkan pagination agar mengurangi beban server dan database saat ada user yang melakukan fetch data pada API note gallery.

Method: `GET`</br>
Uri: `/v1/note-galleries`</br>
Query: `?page={{page}}&limit={{limit}}`</br>
Response:
```json
{
  [
    {
      "id": 1,
      "name": "Robin Nusantara",
      "notes": "Hello World"
    },
    {
      "id": 2,
      "name": "Robin Nusantara",
      "notes": "Hello from Malang"
    },
    {
      "id": 3,
      "name": "Robin Nusantara",
      "notes": null
    }
  ]
}
```

<img width="1232" alt="Screenshot 2023-10-20 at 00 14 56" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/0fa09bfa-f162-48b9-a7b0-b5d0f88bd056">

**Autentikasi**<br/>
API ini digunakan untuk melakukan login dan logout ke admin page. Informasi
yang diinputkan adalah username dan password. Gunakan mekanisme
tokenisasi, session, atau mekanisme lain untuk mendukung fitur ini.

Answer:

Untuk melakukan login ke dalam admin page yang diperlukan adalah username & password yang telah terdaftar didalam database, API signin ini akan mengembalikan response berupa user id, user name, user email, dan token. Token ini akan digunakan untuk melakukan validasi saat user ingin
melakukan fetch data pada API yang tidak bisa di akses secara public (protected routes).

Method: `POST`</br>
Uri: `/v1/auth/signin`</br>
Body:
```json
{
    "username": "robin",
    "password": "robin123"
}
```

<img width="1232" alt="Screenshot 2023-10-20 at 00 32 39" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/b6e827fb-a5f6-4201-9909-dfb7f407aa33">


Method: `DELETE`</br>
Uri: `/v1/auth/signout`</br>
Headers: `token:{{token}}`

API ini akan digunakan untuk melakukan logout dari dashboard, saat berhasil melakukan logout API tidak akan mengembalikan response dikarenakan user token yang telah tersimpan didalam database sudah terhapus oleh karena itu menurut saya saat logout yang di return adalah no content.

<img width="1232" alt="Screenshot 2023-10-20 at 00 44 26" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/3cadf679-93a6-4a50-88c7-af78d94047bc">

**Admin**

API ini digunakan oleh admin page agar dapat mengelola semua data yang
tersimpan di database. Tidak ada data yang dihilangkan pada response API
ini.

Answer:

Pada API ini saya melakukan create, read, delete user dan juga melihat melihat semua data yang ada di guest form.

Method: `POST`</br>
Uri: `/v1/admin/users`</br>
Headers: `token:{{token}}`</br>
Body:
```json
{
    "email": "johndoe@gmail.com",
    "username": "John",
    "password": "XG34zYaQ6GDEl3I"
}
```

API ini akan melakukan insert data user kedalam database, untuk melakukan insert data pada API ini diperlukan login telebih dahulu. Saya juga menerapkan validasi email dan validasi username saat melakukan insert data user untuk menhindari duplikasi data pada user. Kemudian untuk password pada
umumnya sepengelaman saya bisa dilakukan auto generate pada frontend lalu backend akan melakukan enkripsi password sebelum disimpan kedalam database.

<img width="1232" alt="Screenshot 2023-10-20 at 01 55 23" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/bf22cb49-60d3-47f3-9a40-63bda00cc798">

<img width="1232" alt="Screenshot 2023-10-20 at 02 12 33" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/030c1de1-59de-4899-a033-1b516dc1a055">

<img width="1232" alt="Screenshot 2023-10-20 at 02 11 34" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/bcbd52c9-7f16-46a6-9c99-1d5958ac70d1">


Method: `GET`<br/>
Uri: `/v1/admin/users`<br/>
Query: `?page={{page}}&limit={{limit}}`</br>
Headers: `token:{{token}}`

API ini akan melakukan fetch data untuk semua user(admin) yang telah terdaftar didalam database, untuk melakukan fetch data pada API ini diperlukan login terlebih dahulu. Saya juga menghilangkan password user didalam response API ini untuk alasan keamanan data user walaupun
sebenarnya password user yang telah tersimpan sudah saya encrypt menggunakan bcrypt.

<img width="1232" alt="Screenshot 2023-10-20 at 01 58 01" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/ab30ad3f-b5d1-47db-a30a-422156dec017">

Method: `DELETE`<br/>
Uri: `/v1/admin/users`<br/>
Headers: `token:{{token}}`

API ini akan melakukan remove data pada user berdasarkan user id,jika data berhasl di remove akan mengembalikan no response.

<img width="1232" alt="Screenshot 2023-10-20 at 02 18 32" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/29d8eb9c-0cb6-4657-ae9e-07acfbfc2553">

Method: `GET`<br/>
Uri: `/v1/admin/guest-forms`<br/>
Query: `?page={{page}}&limit={{limit}}`</br>
Headers: `token:{{token}}`

API ini akan menampilkan semua guest form yang telah di submit oleh tamu, karena login sebagai admin maka saya menampilkan semua data pada guest form dan tidak ada sama sekali attributes yang dihilangkan.

<img width="1232" alt="Screenshot 2023-10-20 at 02 33 41" src="https://github.com/RobinNusantara/merkleinnovation-test/assets/34237504/f8e176cc-4750-4ccf-ae4c-769a84a16116">

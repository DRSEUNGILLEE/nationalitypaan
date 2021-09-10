// var albumBucketName = 'ojingo';
// var bucketRegion = 'ap-northeast-2';
// var IdentityPoolId = 'ap-northeast-2:78dfddc3-85a3-464a-8a12-81eeb5a56ba5';

// # Display the images to be uploaded.


// AWS.config.update({
//     region: bucketRegion,
//     credentials: new AWS.CognitoIdentityCredentials({
//         IdentityPoolId: IdentityPoolId
//     })
// });

// var s3 = new AWS.S3({
//     apiVersion: '2006-03-01',
// //     params: { Bucket: albumBucketName }
// // });

// function listAlbums() {
//     s3.listObjects({ Delimiter: '/' }, function(err, data) {
//         if (err) {
//             return alert('There was an error listing your albums: ' + err.message);
//         } else {
//             var albums = data.CommonPrefixes.map(function(commonPrefix) {
//                 var prefix = commonPrefix.Prefix;
//                 var albumName = decodeURIComponent(prefix.replace('/', ''));
//                 return getHtml([
//                     '<li>',
//                     '<span onclick="deleteAlbum(\'' + albumName + '\')">X</span>',
//                     '<span onclick="viewAlbum(\'' + albumName + '\')">',
//                     albumName,
//                     '</span>',
//                     '</li>'
//                 ]);
//             });
//             var message = albums.length ?
//                 getHtml([
//                     '<p>Click on an album name to view it.</p>',
//                     '<p>Click on the X to delete the album.</p>'
//                 ]) :
//                 '<p>You do not have any albums. Please Create album.';
//             var htmlTemplate = [
//                 '<h2>Albums</h2>',
//                 message,
//                 '<ul>',
//                 getHtml(albums),
//                 '</ul>',
//                 '<button onclick="createAlbum(prompt(\'Enter Album Name:\'))">',
//                 'Create New Album',
//                 '</button>'
//             ]
//             document.getElementById('app').innerHTML = getHtml(htmlTemplate);
//         }
//     });
// }

// function createAlbum(albumName) {
//     albumName = albumName.trim();
//     if (!albumName) {
//         return alert('Album names must contain at least one non-space character.');
//     }
//     if (albumName.indexOf('/') !== -1) {
//         return alert('Album names cannot contain slashes.');
//     }
//     var albumKey = encodeURIComponent(albumName) + '/';
//     s3.headObject({ Key: albumKey }, function(err, data) {
//         if (!err) {
//             return alert('Album already exists.');
//         }
//         if (err.code !== 'NotFound') {
//             return alert('There was an error creating your album: ' + err.message);
//         }
//         s3.putObject({ Key: albumKey }, function(err, data) {
//             if (err) {
//                 return alert('There was an error creating your album: ' + err.message);
//             }
//             alert('Successfully created album.');
//             viewAlbum(albumName);
//         });
//     });
// }

// function loadphoto(albumName) {

// }
async function init() {

    // const URL = "https://teachablemachine.withgoogle.com/models/27_Bu0tPM/";

    // const modelURL = URL + "model.json";
    // const metadataURL = URL + "metadata.json";
    // model = await tmImage.load(modelURL, metadataURL);
    // maxPredictions = model.getTotalClasses();

    // const prediction = await model.predict(image, false);
    closeNav() 
    console.log('here in js INIT')



}

function viewAlbum(albumName) {
    var albumPhotosKey = encodeURIComponent(albumName) + '//';
    s3.listObjects({ Prefix: albumPhotosKey }, function(err, data) {
        if (err) {
            return alert('There was an error viewing your album: ' + err.message);
        }
        // 'this' references the AWS.Response instance that represents the response
        var href = this.request.httpRequest.endpoint.href;
        var bucketUrl = href + albumBucketName + '/';

        var photos = data.Contents.map(function(photo) {
            var photoKey = photo.Key;
            var photoUrl = bucketUrl + encodeURIComponent(photoKey);
            return getHtml([
                '<span>',
                '<div>',
                '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
                '</div>',
                '<div>',
                '<span onclick="deletePhoto(\'' + albumName + "','" + photoKey + '\')">',
                'X',
                '</span>',
                '<span>',
                photoKey.replace(albumPhotosKey, ''),
                '</span>',
                '</div>',
                '</span>',
            ]);
        });
        var message = photos.length ?
            '<p>Click on the X to delete the photo</p>' :
            '<p>You do not have any photos in this album. Please add photos.</p>';
        var htmlTemplate = [
            '<h2>',
            'Album: ' + albumName,
            '</h2>',
            message,
            '<div>',
            getHtml(photos),
            '</div>',
            '<input id="photoupload" type="file" accept="image/*">',
            '<button id="addphoto" onclick="addPhoto(\'' + albumName + '\')">',
            'Add Photo',
            '</button>',
            '<button onclick="listAlbums()">',
            'Back To Albums',
            '</button>',
        ]
        document.getElementById('app').innerHTML = getHtml(htmlTemplate);
    });
}


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function addPhoto() {
    let rstContainer;
    rstContainer = document.getElementById("result-container");
    try {
        rstContainer.innerHTML = ''

    } catch (e) {
        // statements to handle any unspecified exceptions
        console.log('NO TRY')
    }
    var files = document.getElementById('tgtimg').files;
    if (!files.length) {
        return alert('사진을 올려주세요!^-^');
    }
    var file = files[0];
    var fileName = file.name;
    // var albumPhotosKey = encodeURIComponent(albumName) + '//';

    // var photoKey = albumPhotosKey + fileName;
    var photoKey = fileName;
    // alert(photoKey)


    // alert('Starting Nationality PaanDok');

    var tgtimgURL = 'https://nationalitypaan.netlify.app/images/GGukBBong.gif';
    // alert(tgtimgURL)
    var imsi = show_image(tgtimgURL, 'result-img');
    // alert(imsi)
    var imsi_img = document.getElementById("result-container");

    predict()
    // if (show_image(tgtimgURL, 'result-img')) {
    //     // if (show_image(imsi_img, 'result-img')) {
    //     // console.log('11')
    //     predict()
    // }



    // s3.upload({
    //     Key: photoKey,
    //     Body: file,
    //     ACL: 'public-read'
    // }, function(err, data) {
    //     if (err) {
    //         return alert('There was an error uploading your photo: ', err.message);
    //     }
    //     console.log("image upload complete");
    //     rstContainer.appendChild(document.createElement("div"));

    //     // $.ajax({
    //     //     method: "GET",
    //     //     url: "https://jxjqpnaky4.execute-api.ap-northeast-2.amazonaws.com/transaction/ojingo_paan",
    //     //     data: "jpgname=" + fileName,
    //     //     error: function(request, status, error) {
    //     //         alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
    //     //     }
    //     // })

    //     alert('Starting Nationality PaanDok');

    //     var tgtimgURL = 'https://nationalitypaan.netlify.app/images/ds-logo.png';
    //     // alert(tgtimgURL)
    //     var imsi = show_image(tgtimgURL, 'result-img');
    //     // alert(imsi)
    //     var imsi_img = document.getElementById("result-container");
    //     if (show_image(tgtimgURL, 'result-img')) {
    //         // if (show_image(imsi_img, 'result-img')) {
    //         // console.log('11')
    //         predict()
    //     }
    //     // console.log('here come TOOP predict')
    //     // predict();


    // });
    // Start GOOGLE AI

    // rstContainer2 = document.getElementById("result-container2");
    // rstContainer2.appendChild(document.createElement("div"));


    // console.log('22')
        // predict();

}


// var textnode = document.createTextNode("Water"); // Create a text node

async function predict() {
    console.log('predict in')
    await sleep(300);
    console.log('after sleep')
        // var image = document.getElementById("result-img");
    var image = document.getElementById('originimg');
    linebreak = document.createElement("br");
    linebreak0 = document.createElement("br");
    console.log(image)
    await sleep(300);
    var textnode = document.createTextNode("YOU ARE THE GREAT KOREAN");
    var textnode2 = document.createTextNode("PRIDE OF THE EARTH");
    // var textnode = document.createTextNode("1 in " + prediction[0].className + ": " + prediction[0].probability.toFixed(2) + "and1" + prediction[1].className + ": " + prediction[1].probability.toFixed(2));
    document.getElementById('result-container').appendChild(linebreak0);
    document.getElementById('result-container').appendChild(textnode);
    document.getElementById('result-container').appendChild(linebreak);
    document.getElementById('result-container').appendChild(textnode2);

    // const prediction = await model.predict(image);
    // // const prediction = await model.predict(image,  false);
    // console.log(prediction)
    //     // alert(prediction[0].probability.toFixed(2));
    // if (prediction[0].probability.toFixed(2) >= 0.85) {
    //     // labelContainer.childNodes[0].innerHTML = "ttttt죄송합니다. 탈모입니다.";
    //     var textnode = document.createTextNode("당신은 오징어가 아닙니다");
    //     var textnode2 = document.createTextNode("멋짐 판독기를 이용해주세요");
    //     // var textnode = document.createTextNode("1 in " + prediction[0].className + ": " + prediction[0].probability.toFixed(2) + "and1" + prediction[1].className + ": " + prediction[1].probability.toFixed(2));
    //     document.getElementById('result-container').appendChild(linebreak0);
    //     document.getElementById('result-container').appendChild(textnode);
    //     document.getElementById('result-container').appendChild(linebreak);
    //     document.getElementById('result-container').appendChild(textnode2);


    // } else if (prediction[1].probability.toFixed(2) >= 0.35) {
    //     // labelContainer.childNodes[0].innerHTML = "ttttt다행입니다. 탈모가아닙니다.";
    //     var textnode = document.createTextNode("당신의 오징어 점수는");
    //     var textnode2 = document.createTextNode("백점만점에 " + (prediction[1].probability * 100).toFixed(0) + "점 입니다.");
    //     // var textnode = document.createTextNode("0 in " + prediction[0].className + ": " + prediction[0].probability.toFixed(2) + "andand" + prediction[1].className + ": " + prediction[1].probability.toFixed(2));
    //     document.getElementById('result-container').appendChild(linebreak0);
    //     document.getElementById('result-container').appendChild(textnode);
    //     document.getElementById('result-container').appendChild(linebreak);
    //     document.getElementById('result-container').appendChild(textnode2);


    // } else if (prediction[0].probability.toFixed(2) == 0.38) {
    //     // labelContainer.childNodes[0].innerHTML = "ttttt다행입니다. 탈모가아닙니다.";
    //     var textnode = document.createTextNode("인터넷이 불안정합니다. 다시해주세요.");
    //     // var textnode = document.createTextNode("3838 in " + prediction[0].className + ": " + prediction[0].probability.toFixed(2) + "and1" + prediction[1].className + ": " + prediction[1].probability.toFixed(2));
    //     document.getElementById('result-container').appendChild(linebreak);
    //     document.getElementById('result-container').appendChild(textnode);


    // } else {
    //     var textnode = document.createTextNode("사진이 부정확합니다. 다시해주세요.");
    //     // var textnode = document.createTextNode("else in " + prediction[0].className + ": " + prediction[0].probability.toFixed(2) + "and2" + prediction[1].className + ": " + prediction[1].probability.toFixed(2));
    //     document.getElementById('result-container').appendChild(linebreak);
    //     document.getElementById('result-container').appendChild(textnode);
    // }


    console.log('predict end')


    // var textnode = document.createTextNode(prediction[1].className + ": " + prediction[1].probability.toFixed(2));
    // // var textnode = document.createTextNode("정수리도 개발중입니다.");
    // document.getElementById('result-container2').appendChild(textnode);






}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function show_image(src, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.setAttribute('crossorigin', 'anonymous');
    img.id = "result-img"
    img.align = "center"

    document.getElementById('result-container').appendChild(img);
    console.log('show image end')
    return true;
}


function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.show-for-sr').replaceWith($('.show-for-sr').clone());
    $('.file-upload-content').hide();
    $('.small-10').show();
}
$('.small-10').bind('dragover', function() {
    $('.small-10').addClass('image-dropping');
});
$('.small-10').bind('dragleave', function() {
    $('.ismall-10').removeClass('image-dropping');
});

// $(document).ready(function() {
//     $("#btn_r").button().on("click", function(event) {

//         alert("버튼1이 눌러졌습니다.");

//     });

// });
//end
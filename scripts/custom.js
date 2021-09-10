function readURL(input) {
    if (input.files && input.files[0]) {
        // init().then(function() {
        //     console.log("upload complete");
        //     // predict();
        //     $('#loading').hide();
        // });

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
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function() {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function() {
    $('.image-upload-wrap').removeClass('image-dropping');
}); <
/script > <
script type = "text/javascript" >
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/IvymsDe4W/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    // const flip = true; // whether to flip the webcam
    // webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    // await webcam.setup(); // request access to the webcam
    // await webcam.play();
    // window.requestAnimationFrame(loop);

    // append elements to the DOM
    // document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }

    }

    // async function loop() {
    //   webcam.update(); // update the webcam frame
    //   await predict();
    //   window.requestAnimationFrame(loop);
    // }

    // run the webcam image through the image model

    async function predict() {
        setTimeout(LoadingWithMask(), 3000)

        if (document.getElementById("loc").checked) {


            // predict can take in an image, video or canvas html element
            var image = document.getElementById("face-image")
            const prediction = await model.predict(image, false);
            // for (let i = 0; i < maxPredictions; i++) {
            //   const classPrediction =
            //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            //   labelContainer.childNodes[i].innerHTML = classPrediction;
            // }



            if (prediction[0].className == "taal" && prediction[0].probability.toFixed(2) >= 0.65) {
                labelContainer.childNodes[0].innerHTML = "ttttt죄송합니다. 탈모입니다.";
            } else if (prediction[1].className == "nor" && prediction[1].probability.toFixed(2) >= 0.65) {
                labelContainer.childNodes[0].innerHTML = "ttttt다행입니다. 탈모가아닙니다.";
            } else {
                labelContainer.childNodes[0].innerHTML = "tttt다시해주세요.";
            }

        } else {
            // predict can take in an image, video or canvas html element
            var image = document.getElementById("face-image")
            const prediction = await model.predict(image, false);
            // for (let i = 0; i < maxPredictions; i++) {
            //   const classPrediction =
            //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            //   labelContainer.childNodes[i].innerHTML = classPrediction;
            // }

            if (prediction[0].className == "taal" && prediction[0].probability.toFixed(2) >= 0.65) {
                labelContainer.childNodes[0].innerHTML = "죄송합니다. 탈모입니다.";
            } else if (prediction[1].className == "nor" && prediction[1].probability.toFixed(2) >= 0.65) {
                labelContainer.childNodes[0].innerHTML = "다행입니다. 탈모가아닙니다.";
            } else {
                labelContainer.childNodes[0].innerHTML = "다시해주세요.";
            }

        }
        setTimeout(closeLoadingWithMask(), 3000000)

        // $('#mask, #loadingImg').hide();
        // $('#mask, #loadingImg').remove();
    }

    function LoadingWithMask() {

        var maskHeight = $(document).height();
        var maskWidth = window.document.body.clientWidth;

        //화면에 출력할 마스크를 설정해줍니다.
        var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;' ></div > ";
        // var loadingImg = '';

        // loadingImg += "<div id='loadingImg'>";
        // loadingImg += " <img src='images/Spinner.gif' style='position: relative; display: block; margin: 0px auto;' />";
        // loadingImg += "</div>";

        //화면에 레이어 추가
        $('body')
            .append(mask)
            // .append(loadingImg)

        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
        $('#mask').css({
            'width': maskWidth,
            'height': maskHeight,
            'opacity': '0.3'
        });

        //마스크 표시
        $('#mask').show();

        //로딩중 이미지 표시
        // $('#loadingImg').show();
    }

    function closeLoadingWithMask() {
        $('#mask').hide();
        $('#mask').remove();
    }


    var albumBucketName = 'testdrbuss';
    var bucketRegion = 'ap-northeast-2';
    var IdentityPoolId = 'ap-northeast-2:78dfddc3-85a3-464a-8a12-81eeb5a56ba5';

    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });

    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {
            Bucket: albumBucketName
        }
    });


    function listAlbums() {
        s3.listObjects({
            Delimiter: '/'
        }, function(err, data) {
            if (err) {
                return alert('There was an error listing your albums: ' + err.message);
            } else {
                var albums = data.CommonPrefixes.map(function(commonPrefix) {
                    var prefix = commonPrefix.Prefix;
                    var albumName = decodeURIComponent(prefix.replace('/', ''));
                    return getHtml([
                        '<li>',
                        '<span onclick="deleteAlbum(\'' + albumName + '\')">X</span>',
                        '<span onclick="viewAlbum(\'' + albumName + '\')">',
                        albumName,
                        '</span>',
                        '</li>'
                    ]);
                });
                var message = albums.length ?
                    getHtml([
                        '<p>Click on an album name to view it.</p>',
                        '<p>Click on the X to delete the album.</p>'
                    ]) :
                    '<p>You do not have any albums. Please Create album.';
                var htmlTemplate = [
                    '<h2>Albums</h2>',
                    message,
                    '<ul>',
                    getHtml(albums),
                    '</ul>',
                    '<button onclick="createAlbum(prompt(\'Enter Album Name:\'))">',
                    'Create New Album',
                    '</button>'
                ]
                document.getElementById('app').innerHTML = getHtml(htmlTemplate);
            }
        });
    }

    function createAlbum(albumName) {
        albumName = albumName.trim();
        if (!albumName) {
            return alert('Album names must contain at least one non-space character.');
        }
        if (albumName.indexOf('/') !== -1) {
            return alert('Album names cannot contain slashes.');
        }
        var albumKey = encodeURIComponent(albumName) + '/';
        s3.headObject({
            Key: albumKey
        }, function(err, data) {
            if (!err) {
                return alert('Album already exists.');
            }
            if (err.code !== 'NotFound') {
                return alert('There was an error creating your album: ' + err.message);
            }
            s3.putObject({
                Key: albumKey
            }, function(err, data) {
                if (err) {
                    return alert('There was an error creating your album: ' + err.message);
                }
                alert('Successfully created album.');
                viewAlbum(albumName);
            });
        });
    }

    function viewAlbum(albumName) {
        var albumPhotosKey = encodeURIComponent(albumName) + '//';
        s3.listObjects({
            Prefix: albumPhotosKey
        }, function(err, data) {
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
                    '<img style="width:128px;height:128px;" src="' + photoUrl + '" />',
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

    function addPhoto(albumName) {
        var files = document.getElementById('face-image').files;
        if (!files.length) {
            return alert('Please choose a file to upload first.');
        }
        var file = files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + '//';

        var photoKey = albumPhotosKey + fileName;
        s3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, function(err, data) {
            if (err) {
                return alert('There was an error uploading your photo: ', err.message);
            }
            alert('Successfully uploaded photo.');
            viewAlbum(albumName);
        });
    }
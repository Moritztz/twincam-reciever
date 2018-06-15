'use strict';

var localStream = null;
var peer = null;
let existingCall = null;
var isReceive = true;    //��M��p���ǂ���
const VIDEO_CODEC = 'VP9';

//peerid���擾
function GetPeerId(yourid) {

    //peer�I�u�W�F�N�g�̍쐬
    peer = new Peer(yourid,{
        key: '9373b614-604f-4fd5-b96a-919b20a7c24e',    //APIkey
        debug: 3
    });

    //�C�x���g id�擾�ザ��Ȃ��Ɠ��삵�Ȃ�

    //open�C�x���g
    peer.on('open', function Open () {
    });

    //error�C�x���g
    peer.on('error', function Error (err) {
    });

    //close�C�x���g
    peer.on('close', function Close () {
    });

    //disconnected�C�x���g
    peer.on('disconnected', function Disconnected () {
    });

    //���M����
    peer.on('call', function (call) {
        call.answer();
        setupCallEventHandlers(call);
    });

    return null;
}

//���M����
function MakeCall(calltoid) {
    const call = peer.call(calltoid, localStream, {     //��̓���𑗂�
        videoCodec: VIDEO_CODEC,                        //��������Ȃ��Ɠ��悪�Đ��ł��Ȃ�
        videoReceiveEnabled: isReceive,                 //��M��p�Ƃ��Ă����Őݒ�
        audioReceiveEnabled: isReceive,
    });
    setupCallEventHandlers(call);
}

//�ؒf����
function EndCall() {
    existingCall.close();
}

//Call�I�u�W�F�N�g�ɕK�v�ȃC�x���g
function setupCallEventHandlers(call) {
    if (existingCall) {
        existingCall.close();
    };

    existingCall = call;

    call.on('stream', function (stream) {
        addVideo(call, stream);
    });

    call.on('close', function () {    //??�Ȃ������s���ꂽ���Ŕ��΂���??
        removeVideo(call.remoteId);
    });
}

//video�v�f�̍Đ�
function addVideo(call, stream) {
    $('#their-video').get(0).srcObject = stream;
}

//video�v�f�̍폜
function removeVideo(peerId) {
    $('#their-video').get(0).srcObject = undefined;
}
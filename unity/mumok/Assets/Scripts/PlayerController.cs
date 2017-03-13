using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SocketIO;

public class PlayerController : MonoBehaviour {
    
    public bool isLocalPlayer = true;
    public SocketIOComponent socket;
    
    Vector3 oldPosition;
    Vector3 currentPosition;
    Quaternion oldRotation;
    Quaternion currentRotation;

    // Use this for initialization
    void Start () {
        oldPosition         = transform.position;
        currentPosition     = oldPosition;
        oldRotation         = transform.rotation;
        currentRotation     = oldRotation;
    }
	
	// Update is called once per frame
	void Update () {
        if (!isLocalPlayer)
        {
            return;
        }

        var x = Input.GetAxis("Horizontal") * Time.deltaTime * 150.0f;
        var z = Input.GetAxis("Vertical") * Time.deltaTime * 3.0f;

        transform.Rotate(0, x, 0);
        transform.Translate(0, 0, z);

        currentPosition = transform.position;
        currentRotation = transform.rotation;

        if(currentPosition != oldPosition)
        {


            string positionData = JsonUtility.ToJson(new PositionJSON(transform.position));

            socket.Emit("position", new JSONObject(positionData));
            oldPosition = currentPosition;
        }

        if(currentRotation != oldRotation)
        {
            //TODO: networking
            oldRotation = currentRotation;
        }
	}

    public class PositionJSON
    {
        public float[] position;

        public PositionJSON(Vector3 _position)
        {
            position = new float[] { _position.x, _position.y, _position.z };
        }
    }
}

using UnityEngine;
using System.Collections;
using System;
using System.Collections.Generic;
using SocketIO;

public class NetworkManager : MonoBehaviour {

    public static NetworkManager instance;
    public SocketIOComponent socket;
    public GameObject player;

	// Use this for initialization
	void Start () {

        Debug.Log("ConnectToServer");
        socket.Emit("unityConnect");
    }
    

    #region Commands

    public void CommandMove(Vector3 vec3)
    {
        string positionData = JsonUtility.ToJson(new PositionJSON(vec3));

        socket.Emit("position", new JSONObject(positionData));
    }

    #endregion

    #region Listening



    #endregion

    #region JSONMessageClasses

    public class PositionJSON
    {
        public float[] position;

        public PositionJSON(Vector3 _position)
        {
            position = new float[] { _position.x, _position.y, _position.z };
        }
    }

    public class RotationJSON
    {
        public float[] rotation;

        public RotationJSON(Quaternion _rotation)
        {
            rotation = new float[] { _rotation.eulerAngles.x, _rotation.eulerAngles.y, _rotation.eulerAngles.z };
        }
    }
    #endregion
    
}
